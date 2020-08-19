import type { Container } from "tsparticles/dist/Core/Container";
import { OptionsEditor } from "./Sections/Options/OptionsEditor";
import { Editor } from "object-gui";

export class ParticlesEditor extends Editor {
    constructor(public readonly particles: Container) {
        super(particles.id, "tsParticles", particles);
    }

    protected customize(): void {
        super.customize();

        this.addOptions();
        this.addButtons();
    }

    private addOptions() {
        const options = new OptionsEditor(this.root.data as Container);

        options.addToGroup(this.root);
    }

    private addButtons() {
        this.root.addButton("play", "Play");
        this.root.addButton("pause", "Pause");
        this.root.addButton("refresh", "Refresh");
        this.root.addButton("start", "Start");
        this.root.addButton("stop", "Stop");
        this.root.addButton("exportConfig", "Export", false).click(() => {
            const json = this.particles.exportConfiguration();
            const contentType = "application/json";
            const blob = new Blob([json], { type: contentType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");

            a.download = "particles.json";
            a.href = url;
            a.dataset.downloadUrl = [contentType, a.download, a.href].join(":");

            const e = document.createEvent("MouseEvents");

            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        });
    }
}