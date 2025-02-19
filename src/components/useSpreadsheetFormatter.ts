export const useSpreadsheetFormatter = () => {
  const normalizeInput = (input: string): string[][] => {
    // Split into lines and filter out completely empty lines
    const lines = input.split('\n').filter(line => line.trim())

    // Find the maximum number of columns
    const maxColumns = Math.max(...lines.map(line => line.split('\t').length))

    // Process each line, preserving empty columns
    return lines.map(line => {
      const cells = line.split('\t')
      // Pad with empty strings if needed to maintain column count
      while (cells.length < maxColumns) {
        cells.push('')
      }
      return cells.map(cell => cell.trim())
    })
  }

  const getColumnWidths = (rows: string[][]): number[] => {
    const widths: number[] = []
    rows.forEach(row => {
      row.forEach((cell, index) => {
        // Include empty cells in width calculation
        widths[index] = Math.max(widths[index] || 0, cell.length)
      })
    })
    return widths
  }

  const isNumeric = (str: string): boolean => {
    return /^-?\$?\d+\.?\d*$/.test(str.trim()) || /^-?\d+\.?\d*%?$/.test(str.trim())
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
        // Determine alignment
        const alignment = isNumeric(cell) ? 'right' : 'left'

        return padCell(cell, columnWidths[colIndex], alignment)
      }).join('  ') // Two spaces between columns
    }).join('\n')
  }

  return {
    formatSpreadsheetContent
  }
}
