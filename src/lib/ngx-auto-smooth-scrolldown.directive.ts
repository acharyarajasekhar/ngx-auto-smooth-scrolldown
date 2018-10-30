import { AfterContentInit, Directive, ElementRef, HostListener, Input, OnDestroy } from "@angular/core";

@Directive({
    selector: "[ngx-auto-smooth-scrolldown]",
})
export class NgxAutoSmoothScrollDownDirective implements AfterContentInit, OnDestroy {

    @Input("lock-y-offset") public lockYOffset: number = 100;

    private nativeElement: HTMLElement;
    private _isLocked: boolean = false;
    private mutationObserver: MutationObserver;

    constructor(element: ElementRef) {
        this.nativeElement = element.nativeElement;
    }

    public ngAfterContentInit(): void {
        this.mutationObserver = new MutationObserver(() => {
            if (!this._isLocked) {
                this.scrollDown();
            }
        });
        this.mutationObserver.observe(this.nativeElement, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true,
            characterDataOldValue: true,
            attributeOldValue: true
        });
    }

    public ngOnDestroy(): void {
        this.mutationObserver.disconnect();
    }

    public forceScrollDown(): void {
        this.scrollDown();
    }

    public isLocked(): boolean {
        return this._isLocked;
    }

    private scrollDown(): void {
        this.nativeElement.scrollTo({ left: 0, top: this.nativeElement.scrollHeight, behavior: 'smooth' })
    }

    @HostListener("scroll")
    public scrollHandler(): void {
        const scrollFromBottom = this.nativeElement.scrollHeight - this.nativeElement.scrollTop - this.nativeElement.clientHeight;
        this._isLocked = scrollFromBottom > this.lockYOffset;
    }
    
    private scrollTo(scrollDuration) {
        
        let element = this.nativeElement;

        let scrollStep = element.scrollHeight / (scrollDuration / 25);
        let scrollInterval = setInterval(() => {
            if ((element.scrollTop + element.clientHeight) != element.scrollHeight) {
                element.scrollTop += scrollStep;
            }
            else clearInterval(scrollInterval);
        }, 15);

    }
}
