import * as fs from 'fs'
import moment from 'moment'
import * as path from 'path'

export const getLogFilePath = (fileName: string = 'result'): string => {
  return path.join(`src/logs`, `${moment().format('ddd_DD_MM_YYYY')}_${fileName}.json`)
}
/**
 *
 * @param filePath
 * @param keyPath contain key1.key2
 * @returns
 */
export function getLogKey(filePath: string, keyPath: string): unknown {
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    // If file does not exist, create it with an empty object
    fs.writeFileSync(filePath, JSON.stringify({}), 'utf8')
  }

  // Read the file
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  // Navigate through the nested keys
  const keys = keyPath.split('.')
  let current = data

  for (const key of keys) {
    if (current[key] === undefined) {
      return 0
    }
    current = current[key]
  }

  return current
}

export function saveLogData(filePath: string, keyPath: string, value: unknown): void {
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    // If file does not exist, create it with an empty object
    fs.writeFileSync(filePath, JSON.stringify({}), 'utf8')
  }

  // Read the file
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  // Navigate through the nested keys
  const keys = keyPath.split('.')
  let current = data

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (current[key] === undefined) {
      current[key] = {}
    }
    current = current[key]
  }

  // Set the value
  current[keys[keys.length - 1]] = value

  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
}
