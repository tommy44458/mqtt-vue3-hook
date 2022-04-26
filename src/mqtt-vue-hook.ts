import { App } from 'vue'
import mqtt from 'mqtt'
import { connect, mqttHook, MqttHook } from './hook'

export default {
    install: (_app: App, options: mqtt.IClientOptions) => {
        connect(options)
    },
}
export type { MqttHook }
export const useMQTT = () => mqttHook()
