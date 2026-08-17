import { Response } from "express";
import { AuthRequest } from "../../../middleware/auth";
import {
  Call,
  CallParticipant,
  Invitation,
  ParticipantRole,
} from "../../../models";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendInviteEmail } from "../../../utils/mailer";
import { commonResponse } from "../../../utils/commonResponse";

export const createCall = async (req: AuthRequest, res: Response) => {
  const { title, roomName, recipients } = req.body as {
    title?: string;
    roomName?: string;
    recipients?: Array<{ id?: string; email?: string }>;
  };

  const roomToken = crypto.randomBytes(16).toString("hex");
  const twilioRoomName = roomName?.trim() || `call-${roomToken}`;
  const callTitle = title?.trim() || null;

  const call = await Call.create({
    roomName: twilioRoomName,
    token: roomToken,
    title: callTitle,
    hostId: req.user!.id,
  });

  // create host participant
  await CallParticipant.create({
    callId: call.id,
    userId: req.user!.id,
    role: ParticipantRole.HOST,
  });

  const invitesResponse: Array<{
    id: string;
    inviteUrl: string;
    invitedEmail?: string;
    invitedUserId?: string;
  }> = [];

  const clientUrl = process.env.CLIENT_URL;
  const roomUrl = `${clientUrl}/calls/room/${encodeURIComponent(roomToken)}`;

  if (Array.isArray(recipients) && recipients.length > 0) {
    for (const r of recipients) {
      const invitedUserId = r.id || null;
      const invitedEmail = r.email || null;

      const tokenHash = await bcrypt.hash(roomToken, 10);

      const invite = await Invitation.create({
        callId: call.id,
        invitedUserId,
        invitedEmail,
        tokenHash,
      });

      // attempt to send email if we have an address — log but don't fail call creation
      if (invitedEmail) {
        try {
          await sendInviteEmail(
            invitedEmail,
            roomUrl,
            req.user!.name,
            callTitle || roomToken,
          );
        } catch (err: any) {
          console.error("Failed to send invite email", err?.message || err);
        }
      }

      invitesResponse.push({
        id: String(invite.id),
        inviteUrl: roomUrl,
        invitedEmail: invitedEmail || undefined,
        invitedUserId: invitedUserId || undefined,
      });
    }
  }

  res
    .status(201)
    .json(
      commonResponse(
        { call, token: roomToken, roomUrl, invites: invitesResponse },
        "Call created successfully",
        201,
      ),
    );
};
