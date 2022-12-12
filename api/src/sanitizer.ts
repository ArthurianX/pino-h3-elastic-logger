import { LogMessage } from '../../common/types'

const sanitizeLogItem = (logItem: LogMessage) => {
    try {
        return JSON.stringify(
            logItem,
            _jsonReplacer,
            4 // NOTE: Only using pretty-print for DEMO.
        )
    } catch (e) {}
}

const _isBlacklisted = (key: any) => {
    key = key.toLowerCase()

    return (
        /creditcard/.test(key) ||
        /email/.test(key) ||
        /expiration/.test(key) ||
        /password/.test(key) ||
        /ssn/.test(key)
    )
    // TODO: Make this project specific
}

const _jsonReplacer = (key: any, value: any) => {
    if (key && _isBlacklisted(key)) {
        return '[sanitized]'
    } else {
        return value
    }

    // TODO: Consider adding truncation (or blacklisting) of really massive values.
    // Large items can bog down your log aggregation engine and eat up storage and
    // indexing costs.
}

export default sanitizeLogItem
