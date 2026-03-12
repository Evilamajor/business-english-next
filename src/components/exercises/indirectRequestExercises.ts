export interface IndirectRequestExerciseItem {
  id: number;
  indirect: string;
  direct: string;
  words: string[];
}

function tokenizeDirectRequest(sentence: string): string[] {
  return sentence
    .replace(/[?!.,]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

function createExercise(
  id: number,
  indirect: string,
  direct: string,
): IndirectRequestExerciseItem {
  return {
    id,
    indirect,
    direct,
    words: tokenizeDirectRequest(direct),
  };
}

export const indirectRequestExercises: IndirectRequestExerciseItem[] = [
  createExercise(1, "I wonder if you could send me the updated budget.", "Can you send me the updated budget?"),
  createExercise(2, "I was wondering if you could confirm the meeting time.", "Can you confirm the meeting time?"),
  createExercise(3, "Could you possibly provide the latest sales report?", "Can you provide the latest sales report?"),
  createExercise(4, "I would appreciate it if you could review the document.", "Can you review the document?"),
  createExercise(5, "Would you mind sending the invoice today?", "Can you send the invoice today?"),
  createExercise(6, "Do you think you could organise the meeting room?", "Can you organise the meeting room?"),
  createExercise(7, "I would be grateful if you could update the spreadsheet.", "Can you update the spreadsheet?"),
  createExercise(8, "Could you please forward the client feedback this afternoon?", "Can you forward the client feedback this afternoon?"),
  createExercise(9, "Would it be possible to reschedule the call for tomorrow?", "Can you reschedule the call for tomorrow?"),
  createExercise(10, "I wonder if you could prepare the presentation slides.", "Can you prepare the presentation slides?"),
  createExercise(11, "I was wondering if you could share the contract draft.", "Can you share the contract draft?"),
  createExercise(12, "Could you possibly book a taxi for the visitors?", "Can you book a taxi for the visitors?"),
  createExercise(13, "Would you mind checking the final figures once again?", "Can you check the final figures once again?"),
  createExercise(14, "I would appreciate it if you could send the agenda before lunch.", "Can you send the agenda before lunch?"),
  createExercise(15, "Do you think you could call the supplier this morning?", "Can you call the supplier this morning?"),
  createExercise(16, "I would be grateful if you could clarify the payment terms.", "Can you clarify the payment terms?"),
  createExercise(17, "Could you please print the revised schedule?", "Can you print the revised schedule?"),
  createExercise(18, "Would it be possible to arrange a follow-up meeting next week?", "Can you arrange a follow-up meeting next week?"),
  createExercise(19, "I wonder if you could brief the team on the new policy.", "Can you brief the team on the new policy?"),
  createExercise(20, "I was wondering if you could send me an analysis of last year's sales figures.", "Can you send me an analysis of last year's sales figures?"),
  createExercise(21, "Could you possibly draft a reply to the complaint?", "Can you draft a reply to the complaint?"),
  createExercise(22, "I would appreciate it if you could arrange transport for the delegates.", "Can you arrange transport for the delegates?"),
];