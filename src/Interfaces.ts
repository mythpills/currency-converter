import { rootReducer } from "./store/configureStore";

export interface ILoading {
    type: string
}
export interface IError {
    type: string,
    payload: string
}

export interface IDateRange {
    from: Date,
    to: Date
}

export type RootState = ReturnType<typeof rootReducer>

export interface FromAmountChangeEventTarget extends EventTarget {
    value: number
}

export interface FromAmountChangeEvent extends React.MouseEvent<HTMLElement> {
    target: FromAmountChangeEventTarget
}
export interface ToAmountChangeEventTarget extends EventTarget {
    value: number
}

export interface ToAmountChangeEvent extends React.MouseEvent<HTMLElement> {
    target: ToAmountChangeEventTarget
}
export interface FromCurrencyEventTarget extends EventTarget {
    value: string
}

export interface FromCurrencyEvent extends React.MouseEvent<HTMLElement> {
    target: FromCurrencyEventTarget
}
export interface ToCurrencyEventTarget extends EventTarget {
    value: string
}

export interface ToCurrencyEvent extends React.MouseEvent<HTMLElement> {
    target: FromCurrencyEventTarget
}