import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private swUpdate: SwUpdate) {
  }

  public startCheckingForUpdates() {
    if (this.swUpdate.isEnabled) {
      console.log('Service Workers are enabled');
      this.swUpdate.available.subscribe(async () => {
        await this.swUpdate.activateUpdate();
        document.location.reload();
      });

      setInterval(() => {
        this.swUpdate.checkForUpdate();
      }, 1000 * 60 * 30);
    }
  }

}
