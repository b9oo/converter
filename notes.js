function freqToNote(freq) {
    const notes = [
        "C4","D4","E4","F4","G4","A4","B4",
        "C5","D5","E5","F5","G5","A5","B5"
    ];

    // crude mapping (simple approximation)
    const index = Math.min(
        notes.length - 1,
        Math.floor((freq - 80) / 40)
    );

    return notes[index] || "-";
}
