// useSpreadsheetFormatter.ts
export const useSpreadsheetFormatter = () => {
  const DEFAULT_MAX_WIDTH = 150 // in pixels
  const COLUMN_PADDING = 20 // in pixels

  const measureTextWidth = (text: string): number => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) return 0

    context.font = '14px Helvetica, Arial, sans-serif'
    const metrics = context.measureText(text)
    return Math.ceil(metrics.width)
  }

  const normalizeInput = (input: string): string[][] => {
    // Split into lines and filter out empty lines
    const lines = input.split('\n').filter(line => line.trim())

    return lines.map(line => {
      // Preserve all tabs, even consecutive ones
      const cells = line.split('\t')
      // Don't filter out empty cells - they determine column position
      return cells.map(cell => cell.trim())
    })
  }

  const getColumnWidths = (rows: string[][]): number[] => {
    const widths: number[] = []
    rows.forEach(row => {
      row.forEach((cell, index) => {
        const cellWidth = measureTextWidth(cell || '')
        widths[index] = Math.max(widths[index] || 0, cellWidth)
      })
    })
    return widths.map(width => width + COLUMN_PADDING)
  }

  const padCell = (cell: string, width: number): string => {
    const cellWidth = measureTextWidth(cell || '')
    const spacesNeeded = Math.ceil((width - cellWidth) / measureTextWidth(' '))
    return (cell || '') + ' '.repeat(Math.max(0, spacesNeeded))
  }

  const formatSpreadsheetContent = (input: string): string => {
    if (!input.trim()) return ''

    // Log the input structure
    console.log('Raw input:', input.replace(/\t/g, '[TAB]'))

    const rows = normalizeInput(input)
    console.log('Processed rows:', rows)

    const columnWidths = getColumnWidths(rows)
    console.log('Column widths:', columnWidths)

    return rows.map(row => {
      // Make sure we use every column position
      while (row.length < columnWidths.length) {
        row.push('')
      }
      return row.map((cell, colIndex) => {
        return padCell(cell, columnWidths[colIndex])
      }).join('')
    }).join('\n')
  }

  return {
    formatSpreadsheetContent
  }
}
