/**
 * Azure types package defines this as a simple key->value object,
 * lets be a bit more precise
 */
export type AzureResponse = {
    body: AzureBody,
    headers: { [key: string]: string | number | string[]},
    isRaw: boolean,
    status: number,
}

type AzureBody = string | Buffer | { [k: string]: string} | null;