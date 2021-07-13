import { Document, model, Schema } from "mongoose";

export interface MemberInt extends Document {

    discordId: string;
    round: number;
    day: number;
    timestamp: number;
}

export const Member = new Schema({
    discordId: String,
    round: Number,
    day: Number,
    timestamp: Number,
});

export default model<MemberInt>("member", Member)