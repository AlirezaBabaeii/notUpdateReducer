import React, { useEffect } from "react";

export default function Web() {
  const ws = new WebSocket('ws://127.0.0.1:4100/')
    useEffect(() => {
        ws.onopen = function (event) {
            console.log('connect',event);
            ws.onmessage = function (events) {
        console.log(events.data);
        
            }
          };

  }, []);

  return <div>Web</div>;
}
