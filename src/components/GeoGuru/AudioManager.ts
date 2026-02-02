export class AudioManager {
    private bgm: HTMLAudioElement | null = null;
    private sfx: Map<string, HTMLAudioElement> = new Map();
    private isMuted: boolean = false;
    private isInitialized: boolean = false;

    constructor() { }

    public init() {
        if (this.isInitialized) return;

        // Lazy load audio assets
        this.bgm = new Audio('/assets/geoguru/sounds/bgm.ogg');
        this.bgm.loop = true;

        // Preload effects
        this.sfx.set('correct', new Audio('/assets/geoguru/sounds/correct.ogg'));
        this.sfx.set('wrong', new Audio('/assets/geoguru/sounds/wrong.ogg'));
        this.sfx.set('cheer', new Audio('/assets/geoguru/sounds/cheer.mp3'));
        this.sfx.set('click', new Audio('/assets/geoguru/sounds/click.wav'));

        this.isInitialized = true;
    }

    public playBgm() {
        if (!this.isInitialized) this.init();
        if (this.bgm && !this.isMuted) {
            this.bgm.loop = true; // Enforce loop
            this.bgm.play().catch(e => console.log('Audio autoplay prevented', e));
        }
    }

    public stopBgm() {
        if (this.bgm) {
            this.bgm.pause();
            this.bgm.currentTime = 0;
        }
    }

    public playSfx(name: string) {
        if (!this.isInitialized) this.init();
        if (this.isMuted) return;

        const sound = this.sfx.get(name);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Audio play failed', e));
        }
    }

    public toggleMute(): boolean {
        this.isMuted = !this.isMuted;

        if (this.bgm) {
            if (this.isMuted) {
                this.bgm.pause();
            } else {
                this.bgm.play().catch(e => console.log('Audio autoplay prevented', e));
            }
        }

        return this.isMuted;
    }

    public getMutedState(): boolean {
        return this.isMuted;
    }
}
