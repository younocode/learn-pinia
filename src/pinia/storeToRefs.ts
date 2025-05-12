import {isReactive, isRef, toRaw, toRef} from "vue";
import type {ComputedRef, Ref, ToRef, ToRefs} from "vue";
import type {_ExtractGettersFromSetupStore, _ExtractStateFromSetupStore} from "./store.ts";

type ToComputedRefs<T> = {
    [K in keyof T]: ToRef<T[K]> extends Ref<infer U> ? ComputedRef<U> : ToRef<T[K]>
}

export type StoreToRefs<SS> = ToRefs<_ExtractStateFromSetupStore<SS>> &
    ToComputedRefs<_ExtractGettersFromSetupStore<SS>>

export function storeToRefs<SS extends {}>(store: SS): StoreToRefs<SS> {
    store = toRaw(store)
    const refs = {} as StoreToRefs<SS>
    for (const key in store) {
        const value = store[key]
        if (isRef(value) || isReactive(value)) {
            // @ts-ignore
            refs[key] = toRef(store, key)
        }
    }
    return refs
}