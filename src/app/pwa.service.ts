import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

const pwa = {deferredPrompt: null};
const havePwaOption = new BehaviorSubject(false);

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    pwa.deferredPrompt = e;
    havePwaOption.next(true);
    console.log('pwa option active');
});


@Injectable({
    providedIn: 'root'
})
export class PwaService {

    havePwaOption$ = havePwaOption;

    constructor() {
    }

    verifyPwaOption() {
        return !!pwa.deferredPrompt && !this.isAlreadyPwa();
    }

    // Detects if device is on iOS
    isIos() {
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIos = /iphone|ipad|ipod/.test(userAgent);
        console.log('Is ios???');
        return isIos;
    }

    isAlreadyPwa() {

        // @ts-ignore
        if (navigator.standalone) {
            console.log('Is installed');
            return true;
        } else if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('Is installed');
            return true;
        }
        console.log('Is NOT installed');
        return false;
    }

    installPwa() {
        console.log('Continu install');
        pwa.deferredPrompt.prompt();
    }

}
