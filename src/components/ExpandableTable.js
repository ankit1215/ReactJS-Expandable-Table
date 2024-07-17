import React, {useState, useEffect}from 'react';

const ExpandableTable = () => {
    const [data, setData] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        fetch('/data.json')
          .then(response => response.json())
          .then(data => setData(data.rows));
      }, []);
    
      const handleRowClick = (id) => {
        setExpandedRows(prevState => 
          prevState.includes(id) ? prevState.filter(rowId => rowId !== id) : [...prevState, id]
        );
      };

      const handleRowSelection = (id) => {
        setSelectedRows(prevState => 
          prevState.includes(id) ? prevState.filter(rowId => rowId !== id) : [...prevState, id]
        );
      };
    
      const renderRows = (rows, level = 0) => {
        return rows.map(row => (
          <React.Fragment key={row.id}>
            <tr 
              onClick={() => handleRowClick(row.id)}
              onDoubleClick={() => handleRowSelection(row.id)}
              style={{ 
                paddingLeft: `${level * 20}px`,
                backgroundColor: selectedRows.includes(row.id) ? '#c02727' : 'white'
              }}
            >
                <td>{row.text1}</td>
          <td>{row.text2}</td>
        </tr>
        {expandedRows.includes(row.id) && row.children.length > 0 && renderRows(row.children, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Text 1</th>
          <th>Text 2</th>
        </tr>
      </thead>
      <tbody>
        {renderRows(data)}
      </tbody>
    </table>
  );
};

export default ExpandableTable;