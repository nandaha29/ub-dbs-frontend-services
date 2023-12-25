import React, { Component } from "react";

class Table_Stok_Sembako extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        ["Minyak Goreng", "60 kg", "350"],
        ["Barang", "50 kg", "450"],
        ["Gula Pasir", "45 kg", "500"],
      ],
      inputValues: ['', '', ''],
      isInputMode: false,
      alignLeft: false,
      editIndex: null,
      selectedImage: null,
    };
  }

  handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/png') {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          selectedImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  handleInputChange = (index, value) => {
    this.setState(prevState => {
      const inputValues = [...prevState.inputValues];
      inputValues[index] = value;
      return { inputValues };
    });
  };

  addRow = () => {
    this.setState({
      isInputMode: true,
      alignLeft: true,
      inputValues: ['', '', ''],
      editIndex: null,
      selectedImage: null, // tambahkan baris ini untuk menghapus gambar yang dipilih sebelumnya
    });
  };
  

  editRow = (index) => {
    const { rows } = this.state;
    const editValues = rows[index].slice(0, 3);
    editValues[1] = editValues[1].replace(/\s*kg\s*$/, ""); // Menghapus "kg" dari nilai stok
    const selectedImage = rows[index][3];
    this.setState({
      inputValues: editValues,
      isInputMode: true,
      alignLeft: true,
      editIndex: index,
      selectedImage,
    });
  };

  cancelInput = () => {
    const { editIndex, rows } = this.state;
    const selectedImage = editIndex !== null ? rows[editIndex][3] : null;
    this.setState({
      isInputMode: false,
      alignLeft: false,
      editIndex: null,
      inputValues: ['', '', ''],
      selectedImage: null, // tambahkan baris ini untuk menghapus gambar yang dipilih sebelumnya
    });
  };
  
  finishInput = () => {
    const { rows, inputValues, editIndex } = this.state;
    if (inputValues.some(value => value === '')) {
      alert("Mohon lengkapi semua input sebelum menyimpan data.");
      return;
    }
    const newRow = [...inputValues];
    newRow[1] = newRow[1].replace(/ kg$/, "") + " kg";
    if (editIndex !== null) {
      const updatedRows = [...rows];
      updatedRows[editIndex] = newRow;
      this.setState({
        rows: updatedRows,
        inputValues: ['', '', ''],
        isInputMode: false,
        alignLeft: false,
        editIndex: null,
        selectedImage: null, // tambahkan baris ini untuk menghapus gambar yang dipilih sebelumnya
      });
    } else {
      this.setState(prevState => ({
        rows: [...prevState.rows, newRow],
        inputValues: ['', '', ''],
        isInputMode: false,
        alignLeft: false,
        selectedImage: null, // tambahkan baris ini untuk menghapus gambar yang dipilih sebelumnya
      }));
    }
  };
  
  
  openTambahItemModal = () => {
    // Mengatur nilai inputValues menjadi kosong saat membuka modal
    this.setState({
      inputValues: ['', '', ''],
    });
  };
  
  
  

  render() {
    const { rows, inputValues, isInputMode, alignLeft, selectedImage } = this.state;
    return (
      <div>
        <div className="card">
          <div className="card-header border-1">
            <h3 className="card-title">
              <i className="fas fa-chart-pie mr-1" />
              Table_Stok_Sembako
            </h3>
            <div className="card-tools">
              <button type="button" className="btn btn-tool" data-card-widget="collapse">
                <i className="fas fa-minus" />
              </button>
              <button type="button" className="btn btn-tool" data-card-widget="remove">
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
          <div className="card-body table-responsive p-0">
            <table className="table table-striped table-valign-middle h6">
              <thead>
                <tr className="text-center">
                  <th className={alignLeft ? "text-left" : "text-center"}>Nama Produk</th>
                  <th>Jumlah</th>
                  <th>Poin (per 0,5kg)</th>
                  {!isInputMode && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    {row.map((value, colIndex) => (
                      <td key={colIndex} className={colIndex === 0 ? (alignLeft ? "text-left" : "text-center") : "text-center"}>
                        {value}
                      </td>
                    ))}
                    {!isInputMode && (
                      <td className="text-center">
                        <button className="btn-success border-0" data-toggle="modal" data-target="#modal_edit_item" onClick={() => this.editRow(index)}>Edit</button>
                      </td>
                    )}
                  </tr>
                ))}
                {isInputMode && (
                  <tr>
                    <td className={alignLeft ? "text-left" : "text-center"}>
                      <input
                        type="text"
                        value={inputValues[0]}
                        onChange={(e) => this.handleInputChange(0, e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={inputValues[1]}
                        onChange={(e) => this.handleInputChange(1, e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="text"
                        value={inputValues[2]}
                        onChange={(e) => this.handleInputChange(2, e.target.value)}
                      />
                    </td>
                    <td className="text-center">
                      <button className="btn-success border-0" onClick={this.finishInput}>
                        Simpan
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="d-flex justify-end justify-items-end px-3 pt-5 pb-3">
              {!isInputMode ? (
                <button className="ml-auto border-0 fill-gray p-2" data-toggle="modal" data-target="#modal_tambah_nasabah">
                  Tambah item
                </button>
              ) : (
                <button className="ml-auto border-0 fill-gray p-2" onClick={this.cancelInput}>
                  Batal
                </button>
              )}
            </div>
          </div>
        </div>

        {/* MODAL TAMBAH ITEM */}
        <div className="modal fade" id="modal_tambah_nasabah" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" onShow={this.openTambahItemModal}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Tambah Sembako
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Nama Sembako:</label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input type="text" className="form-control" value={inputValues[0]} onChange={(e) => this.handleInputChange(0, e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Harga per poin 0.5 kg (poin):</label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input type="number" className="form-control" value={inputValues[2]} onChange={(e) => this.handleInputChange(2, e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Stok (kg):</label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input type="number" className="form-control" value={inputValues[1]} onChange={(e) => this.handleInputChange(1, e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Upload Gambar (PNG):</label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input type="file" accept=".png" onChange={this.handleImageUpload} />
                        {selectedImage && (
                          <img src={selectedImage} alt="Preview" style={{ width: "100%" }} />
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.cancelInput}>
                  Batal
                </button>
                <button type="button" className="btn btn-primary" onClick={this.finishInput}>
                  Tambah
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* MODAL EDIT ITEM */}
        <div className="modal fade" id="modal_edit_item" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Edit Sembako
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Nama Sembako:</label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input type="text" className="form-control" value={inputValues[0]} onChange={(e) => this.handleInputChange(0, e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Harga per poin 0.5 kg (poin):</label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input type="number" className="form-control" value={inputValues[2]} onChange={(e) => this.handleInputChange(2, e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Stok (kg):</label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input type="number" className="form-control" value={inputValues[1]} onChange={(e) => this.handleInputChange(1, e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Upload Gambar (PNG):</label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input type="file" accept=".png" onChange={this.handleImageUpload} />
                        {selectedImage && (
                          <img src={selectedImage} alt="Preview" style={{ width: "100%" }} />
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.cancelInput}>
                  Batal
                </button>
                <button type="button" className="btn btn-primary" onClick={this.finishInput}>
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Table_Stok_Sembako;