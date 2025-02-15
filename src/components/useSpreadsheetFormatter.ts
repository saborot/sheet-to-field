// useSpreadsheetFormatter.ts
import { ref } from 'vue'

export const useSpreadsheetFormatter = () => {
  const normalizeInput = (input: string): string[][] => {
    // Split into lines and remove empty lines
    const lines = input.split('\n').filter(line => line.trim())

    // Process each line
    return lines.map(line => {
      // Split by tabs and clean up each cell
      return line.split('\t')
        .map(cell => cell.trim())
        .filter(cell => cell.length > 0)
    })
  }

  const getColumnWidths = (rows: string[][]): number[] => {
    const widths: number[] = []
    rows.forEach(row => {
      row.forEach((cell, index) => {
        widths[index] = Math.max(widths[index] || 0, cell.length)
      })
    })
    return widths
  }

  const padCell = (cell: string, width: number, alignment: 'left' | 'right'): string => {
    const padding = width - cell.length
    if (alignment === 'right') {
      return ' '.repeat(padding) + cell
    }
    return cell + ' '.repeat(padding)
  }

  const formatSpreadsheetContent = (input: string): string => {
    if (!input.trim()) return ''

    // Process the input into structured data
    const rows = normalizeInput(input)

    // Get column widths
    const columnWidths = getColumnWidths(rows)

    // Format each row
    return rows.map(row => {
      return row.map((cell, colIndex) => {
        // Determine alignment based on content
        const isNumber = /^-?[\d,]+\.?\d*$/.test(cell)
        const alignment = isNumber ? 'right' : 'left'

        return padCell(cell, columnWidths[colIndex], alignment)
      }).join('  ') // Two spaces between columns
    }).join('\n')
  }

  return {
    formatSpreadsheetContent
  }
}
