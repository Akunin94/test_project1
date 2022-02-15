import {Component, UI} from "../app/ui";
import axios from "axios";

@Component({
    // language=Vue
    template: `
        <v-container fluid class="selectable">
          main page
          events size: {{ events.length }}
					{{selected}}
          <v-data-table
						:headers="eventsHeaders"
						:items="events"	
						item-key="date"
						class="elevation-1"
					>
						<template v-slot:items="props">
							<td class="">{{ props.item.date }}</td>
							<td class="">{{ props.item.totalAmount }}</td>
							<td class="">{{ props.item.quantity }}</td>
							<td class=""><router-link :to="{name: 'eventPage', params: {date: props.item.date}}">{{props.item.label}}</router-link></td>
							<td class="">{{ props.item.comment }}</td>
							<td class="">{{ props.item.period }}</td>
							<td class="">
								<input type="checkbox" @click="selectedToggle(props.item)" style="width: 20px; height: 20px;">
							</td>
				
						</template>
						<template v-slot:top>
							<v-switch
								v-model="singleSelect"
								label="Single select"
								class="pa-3"
							></v-switch>
						</template>
					</v-data-table>
          <br />
          <br />
          TotalAmount: 
        </v-container>
    `
})
export class MainPage extends UI {
		private eventsHeaders: any = [
			{ text: 'Event Date', sortable: false	},
			{ text: 'totalAmount', sortable: false },
			{ text: 'quantity', sortable: false },
			{ text: 'label', sortable: false },
			{ text: 'Comment', sortable: false },
			{ text: 'Period', sortable: false },
			{ text: '', sortable: false },
		]
		private selected: any = []
    private events: any = [];
    private singleSelect: Boolean = true;

    async created(): Promise<void> {
        this.events = (await axios.get('http://localhost:3004/events')).data;
    }

		public selectedToggle(item: object): void {
			let hasValue = false
			
			// @ts-ignore
			this.selected = this.selected.filter(s => s.date !== item.date)

			if (!hasValue) {
				this.selected.push(item)
			}
		}
}

