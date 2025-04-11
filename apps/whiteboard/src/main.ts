import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { effects } from '@blocks/whiteboard'

effects()

createApp(App).mount('#app')
