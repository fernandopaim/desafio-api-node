<template>
  <v-app id="body">
      <div class="container-fluid">
            <div class="row">
                <div class="d-none d-lg-block col-lg-2 text-center">
                <vue-cal id="mini-calendar" xsmall locale="pt-br" :time="false"
                    hide-view-selector active-view="month"
                    class="vuecal--blue-theme vuecal--rounded-theme"
                    :selected-date="selectedDate"
                    :start-week-on-sunday="true"
                    :disable-views="['years', 'year', 'week', 'day']"
                    :min-date="new Date()"
                    @cell-focus="selectedDate = $event" />
                </div>
                <div class="col-md-12 col-lg-10">
                <vue-cal id="vuecal" locale="pt-br"
                    :time-from="vuecalConfig.startDay"
                    :time-to="vuecalConfig.endDay"
                    :time-cell-height="80" :time-step="vuecalConfig.timeStep"
                    :disable-views="['week','years', 'year', 'month']"
                    hide-view-selector active-view="day"
                    :min-cell-width="80"
                    :selected-date="selectedDate"
                    :events="events" :drag-to-create-event="false"
                    :editable-events="{ title: false, drag: false, resize: false,
                    delete: false, create: false }"
                    @view-change="fetchHorarios" />
                </div>
            </div>
        </div>
  </v-app>
</template>

<script>
import moment from 'moment'
import 'moment/locale/pt'
import vueCal from 'vue-cal'
import vueCalPtBr from 'vue-cal/dist/i18n/pt-br.js'
import 'vue-cal/dist/vuecal.css'


export default {
    name: 'Body',
    components: {
        vueCal,
    },
    data: () => ({
        selectedDate: moment(new Date()).format('YYYY-MM-DD'),
        events: [],
        vuecalConfig: {
            startDay: 0 * 60,
            endDay: 24 * 60,
            timeStep: 60,
            minCellWidth: 250,
        },
    }),
    mounted() {
        this.fetchHorarios()
    },
    methods: {
        fetchHorarios: function(date) {
            if (!!date) {
                if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
                    this.selectedDate = date
                } else if (!!date.startDate && moment.isDate(date.startDate)) {
                    this.selectedDate = moment(date.startDate).format('YYYY-MM-DD')
                } else {
                    console.log('Erro ao atualizar agenda. Erro na data selecionada.')
                    return
                }
            }

            fetch(`//localhost:8002/programming?date=${this.selectedDate}`, {
                method: 'POST',
            }).then((response) => {
                response.json().then((data) => {
                    // console.log(data)
                    let date = data.programme.date

                    this.events = data.programme.entries.map(ev => {
                        return {
                            'title': ev.title,
                            'start': moment(`${date} ${ev.human_start_time}`).format('YYYY-MM-DD HH:mm'),
                            'end': moment(`${date} ${ev.human_end_time}`).format('YYYY-MM-DD HH:mm'),
                            // 'class': `ev-color-${ev.tipo} ${labelConfig.customClass}`,
                            // 'split': null,
                            'contentFull': ev.description,
                            'content': ev.description,
                            'info': ev
                        }
                    })
                })
            })
        }
    },
}
</script>

<style lang="sass" scoped>
    *::v-deep
        #mini-calendar,
        #vuecal
            border-radius: 10px
            overflow: hidden

        #mini-calendar
            height: 290px

            .vuecal__body
                padding-left: 5px !important
                padding-right: 5px

            .vuecal__cell
                cursor: pointer

            .vuecal__cell-content
                background-color: rgba(206, 107, 65, .2)

            .vuecal__cell--selected .vuecal__cell-content
                border-color: #61a9e0
                background-color: rgba(51, 117, 148, .5)

            .vuecal__cell--disabled .vuecal__cell-content
                background-color: rgba(143, 151, 156, .2)

        .vuecal__title-bar
            background-color: #383737
            color: rgba(255, 255, 255, 0.8)
</style>
