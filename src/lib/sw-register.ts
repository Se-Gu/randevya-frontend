declare global {
  interface Window {
    workbox: {
      addEventListener: (event: string, callback: (event: any) => void) => void;
      messageSkipWaiting: () => void;
      register: () => void;
    };
  }
}

export function registerServiceWorker() {
  if (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    window.workbox !== undefined
  ) {
    const wb = window.workbox;

    // Add event listeners to handle PWA lifecycle
    wb.addEventListener("installed", (event: any) => {
      console.log(`Event ${event.type} is triggered.`);
      console.log(event);
    });

    wb.addEventListener("controlling", (event: any) => {
      console.log(`Event ${event.type} is triggered.`);
      console.log(event);
    });

    wb.addEventListener("activated", (event: any) => {
      console.log(`Event ${event.type} is triggered.`);
      console.log(event);
    });

    // Send skip waiting to the service worker
    wb.addEventListener("waiting", (event: any) => {
      console.log(`Event ${event.type} is triggered.`);
      console.log(event);
      wb.messageSkipWaiting();
    });

    // Register the service worker after event listeners are added
    wb.register();
  }
}
