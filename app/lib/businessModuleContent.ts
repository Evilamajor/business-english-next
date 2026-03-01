import type { ModuleSlug } from "@/app/lib/businessNavigation";

export interface ModuleContent {
  summary: string;
  objectives: string[];
  vocabulary: Array<{ term: string; definition: string }>;
  grammarFocus: {
    title: string;
    points: string[];
  };
  practiceTasks: string[];
}

export const businessModuleContent: Record<ModuleSlug, ModuleContent> = {
  "meeting-and-presentations": {
    summary:
      "Build confidence when chairing meetings and presenting ideas with clear structure and persuasive language.",
    objectives: [
      "Open meetings with a clear objective and expected outcomes.",
      "Signpost presentation sections for smoother transitions.",
      "Handle questions diplomatically and keep discussions on track.",
    ],
    vocabulary: [
      { term: "agenda", definition: "A list of topics planned for a meeting." },
      { term: "key takeaway", definition: "The most important message the audience should remember." },
      { term: "action item", definition: "A specific task assigned to someone after discussion." },
      { term: "stakeholder", definition: "A person or group affected by the decision or project." },
    ],
    grammarFocus: {
      title: "Signposting and Clarifying Statements",
      points: [
        "Use sequencing language: first, next, finally.",
        "Use clarifiers: in other words, to put it simply.",
        "Use polite interruption forms to manage questions.",
      ],
    },
    practiceTasks: [
      "Write a short meeting opening and closing statement for a weekly team sync.",
      "Prepare a 90-second presentation summary using signposting phrases.",
      "Role-play handling two audience questions with clear follow-up actions.",
    ],
  },
  "telephone-skills": {
    summary:
      "Improve call handling, message-taking, and clarification strategies for professional phone communication.",
    objectives: [
      "Start and end calls using professional tone and structure.",
      "Confirm details accurately through active listening.",
      "Escalate or transfer calls clearly when needed.",
    ],
    vocabulary: [
      { term: "hold the line", definition: "Wait on the phone while the caller is transferred or checked." },
      { term: "patch through", definition: "Connect a caller to another person." },
      { term: "line dropped", definition: "The call disconnected unexpectedly." },
      { term: "follow-up", definition: "An additional contact after the initial call." },
    ],
    grammarFocus: {
      title: "Polite Requests and Confirmation",
      points: [
        "Use could/would for polite requests.",
        "Use question tags and confirmation checks.",
        "Use indirect questions in formal call situations.",
      ],
    },
    practiceTasks: [
      "Simulate taking a message with name, company, and callback details.",
      "Practice three ways to ask for clarification politely.",
      "Create a script for transferring a call to another department.",
    ],
  },
  "videoconference-and-discussions": {
    summary:
      "Lead remote meetings effectively with inclusive language, turn-taking cues, and concise summaries.",
    objectives: [
      "Set remote meeting norms and discussion flow.",
      "Invite quieter participants to contribute.",
      "Summarize decisions and next steps before closing.",
    ],
    vocabulary: [
      { term: "bandwidth", definition: "Internet capacity affecting call quality and stability." },
      { term: "mute/unmute", definition: "Disable or enable microphone input." },
      { term: "breakout room", definition: "A small-group discussion space inside a video meeting." },
      { term: "screen share", definition: "Display your screen content to participants." },
    ],
    grammarFocus: {
      title: "Facilitating Discussion and Turn-Taking",
      points: [
        "Use hedging language to keep tone collaborative.",
        "Use prompts for inviting opinions and balancing participation.",
        "Use concise recap forms to align the group.",
      ],
    },
    practiceTasks: [
      "Draft a 5-minute videoconference opening with participation guidelines.",
      "Write phrases to invite input from three different team roles.",
      "Deliver a final recap with decision, owner, and deadline.",
    ],
  },
  "internal-correspondence": {
    summary:
      "Write clear and professional internal communication that drives action and reduces confusion.",
    objectives: [
      "Organize emails with purpose, context, and action requests.",
      "Adjust tone for peers, managers, and cross-functional teams.",
      "Summarize updates concisely for quick reading.",
    ],
    vocabulary: [
      { term: "FYI", definition: "For your information; shared with no direct action required." },
      { term: "deadline", definition: "The latest date by which work should be completed." },
      { term: "alignment", definition: "Shared understanding and agreement on priorities." },
      { term: "escalation", definition: "Raising an issue to a higher level for support or decision." },
    ],
    grammarFocus: {
      title: "Clarity in Business Writing",
      points: [
        "Use concise active voice in update messages.",
        "Use modals to soften requests and maintain politeness.",
        "Use bullet-based parallel structure for action items.",
      ],
    },
    practiceTasks: [
      "Rewrite a long update email into a concise three-part structure.",
      "Draft a reminder email that keeps a positive tone.",
      "Create a weekly status note with owners and deadlines.",
    ],
  },
  "invitations-suggestions-complaints": {
    summary:
      "Communicate invitations, suggestions, and complaints with professionalism and cultural sensitivity.",
    objectives: [
      "Invite participants with clear purpose and logistics.",
      "Offer suggestions in constructive and solution-focused language.",
      "Raise complaints factually while preserving working relationships.",
    ],
    vocabulary: [
      { term: "proposal", definition: "A suggested plan or recommendation for consideration." },
      { term: "concern", definition: "A problem or issue that requires attention." },
      { term: "appreciate", definition: "A polite expression of thanks or recognition." },
      { term: "resolution", definition: "An agreed way to solve a problem." },
    ],
    grammarFocus: {
      title: "Diplomatic Language Patterns",
      points: [
        "Use softening phrases to reduce directness.",
        "Use conditionals for tactful suggestions.",
        "Use neutral wording when reporting complaints.",
      ],
    },
    practiceTasks: [
      "Write a formal invitation email for a client workshop.",
      "Transform direct criticism into diplomatic suggestion language.",
      "Draft a complaint message with clear facts and expected resolution.",
    ],
  },
  "opening-and-closing": {
    summary:
      "Master professional openings and closings across meetings, calls, and written communication.",
    objectives: [
      "Start interactions with clear context and purpose.",
      "Close conversations with alignment on next steps.",
      "Adapt level of formality by audience and channel.",
    ],
    vocabulary: [
      { term: "greeting", definition: "The opening phrase used to begin an interaction." },
      { term: "wrap up", definition: "The final summary and closure of a discussion." },
      { term: "next steps", definition: "Actions that follow after a meeting or conversation." },
      { term: "appreciation", definition: "A courteous expression of thanks before ending." },
    ],
    grammarFocus: {
      title: "Framing Openings and Closings",
      points: [
        "Use present simple for purpose statements.",
        "Use future forms for commitments and follow-ups.",
        "Use polite closure expressions for professional tone.",
      ],
    },
    practiceTasks: [
      "Create three opening scripts for different business contexts.",
      "Write closing statements that confirm owners and deadlines.",
      "Edit an informal ending into a professional close.",
    ],
  },
};
