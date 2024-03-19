import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const TableDataToExcel = ({ data, nomFichier, titre }) => {
  const downloadExcelFile = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(excelBlob, nomFichier);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Télécharger en excel
    </Tooltip>
  );

  return (
    <div>
      {/* Your table rendering here */}
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        {/* <Button variant="success">Hover me to see</Button> */}
        <button className='px-2 py-1 rounded-2' style={{ backgroundColor: '#f12711', position: "static" }} onClick={downloadExcelFile}>
          <AiOutlineCloudDownload size={25} />
        </button>
      </OverlayTrigger>
    </div>
  );
};

export default TableDataToExcel;
