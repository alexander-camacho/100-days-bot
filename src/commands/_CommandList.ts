import { CommandInt } from "../interfaces/CommandInt";
import { oneHundred } from "./oneHundred";
import { view } from "./view";
import { edit } from "./edits";
import { help } from "./help";

export const CommandList: CommandInt[] = [oneHundred, view, edit, help];