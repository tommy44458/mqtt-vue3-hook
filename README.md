# Mqtt-Vue-Hook

Connect to mqtt broker, support Vue3, Vite.

## Install

#### Npm
``` bash
npm install mqtt-vue-hook --save
```
#### Yarn
``` bash
yarn add mqtt-vue-hook -D
```

## Usage
#### main.ts (Vue3)
``` ts
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import mqttVueHook from 'mqtt-vue-hook'
// app.use(mqttVueHook, options)
app.use(mqttVueHook, {
    protocol: 'ws',
    host: mqttHost,
    port: mqttPort,
    clean: false,
    keepalive: 60,
    clientId: `mqtt_client_${Math.random().toString(16).substring(2, 10)}`,
    connectTimeout: 4000,
})
```
options: https://github.com/mqttjs/MQTT.js#client

#### Subscribe
``` vue
<script setup lang="ts">
import { useMQTT } from 'mqtt-vue-hook'

onMounted(() => {
	const mqttHook = useMQTT()
        // mqttHook.subscribe([...topic], qos)
        // mqttHook.unSubscribe(topic)
        // '+' == /.+/
        // '#' == /[A-Za-z0-9/]/
	mqttHook.subscribe(['+/root/#'], 1)
})
</script>
```
options: https://github.com/mqttjs/MQTT.js#subscribe

#### Publish
``` vue
<script setup lang="ts">
import { useMQTT } from 'mqtt-vue-hook'

onMounted(() => {
	const mqttHook = useMQTT()
        // mqttHook.publish(topic, message, qos)
	mqttHook.publish(['test/root/1'], 'my message', 1)
})
</script>
```
options: https://github.com/mqttjs/MQTT.js#publish

#### Register Event
``` vue
<script setup lang="ts">
import { useMQTT } from 'mqtt-vue-hook'

onMounted(() => {
	const mqttHook = useMQTT()

        // mqttHook.registerEvent(topic, callback function, vm = current instance or string)
        // mqttHook.unRegisterEvent(topic, vm)
	mqttHook.registerEvent(
		'+/root/#',
		(topic: string, message: string) => {
			Notification({
				title: topic,
				message: message.toString(),
				type: 'info',
			})
		},
    this,
	)
})
</script>
```
