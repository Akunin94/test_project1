import {Component, UI} from "../app/ui";
import axios from "axios";

@Component({
    // language=Vue
    template: `
        <div>
            {{event.date}}
            {{event.label}}
        </div>
    `
})
export class EventPage extends UI {
    private event: any = {};
    private eventDate: string = this.$route.params.date;

    async created(): Promise<void> {
        const allEvents = await axios.get('http://localhost:3004/events').then(response => response.data)
        // @ts-ignore
        this.event = allEvents.find(e => e.date === this.eventDate)
    }
}
