export enum FormMode {
    NO_ACTION = "",
    VIEW = "Details",
    ADD = "Create",
    EDIT = "Update",
}

export type ConfirmDialogState = {
    open: boolean;
    id: string;
    name: string;
};

export const confirmDialogStateDefault: ConfirmDialogState = {
    open: false,
    id: "",
    name: "",
};

export type FormSetting = {
    mode: FormMode;
    open: boolean;
};

export const formSettingDefault: FormSetting = {
    mode: FormMode.NO_ACTION,
    open: false,
};
