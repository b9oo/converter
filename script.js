async function convert() {
    const file = document.getElementById("file").files[0];
    const out = document.getElementById("out");

    if (!file) {
        out.textContent = "No file selected.";
        return;
    }

    out.textContent = "Reading audio...";

    const audioCtx = new AudioContext();
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    const data = audioBuffer.getChannelData(0);

    let notes = [];
    let step = 2000;

    for (let i = 0; i < data.length; i += step) {
        let slice = data.slice(i, i + step);

        let sum = 0;
        for (let j = 0; j < slice.length; j++) {
            sum += Math.abs(slice[j]);
        }

        let avg = sum / slice.length;

        let freq = avg * 1000 + 100; // fake pitch estimate

        let note = freqToNote(freq);
        notes.push(note);
    }

    let melody = notes.join(" ");

    out.textContent =
        "MakeCode Melody:\n\n" +
        melody +
        "\n\nCopy into music.playMelody()";
}
