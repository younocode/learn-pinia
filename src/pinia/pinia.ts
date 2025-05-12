import {effectScope, EffectScope, ref} from 'vue'
import type {App, Ref} from "vue";

export interface Pinia {
    install: (app: App) => void
    scope: EffectScope
    state: Ref<any>
    stores: Record<string, any>
}

export let activePinia: Pinia | undefined

export function setActivatePinia(p: Pinia) {
    activePinia = p
}

export function createPinia() {
    const scope = effectScope(true)
    const state = scope.run(() => {
        return ref({})
    }) as Ref<any>


    const pinia: Pinia = {
        install() {
            setActivatePinia(pinia)
        },
        scope,
        state,
        stores: {} as Record<string, any>,
    }
    return pinia
}

