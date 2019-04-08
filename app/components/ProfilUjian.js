import React, { Component } from 'react';
import { List, Avatar } from 'antd';

import moment from 'moment';
import 'moment/locale/id';

export default class ProfilUjian extends Component {
  render() {
    const { grid, ujian } = this.props;

    return (
      <List grid={grid}>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="info" />}
            title={<a>Nama Ujian</a>}
            description={ujian.nama}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="info" />}
            title={<a>Pin Ujian</a>}
            description={ujian.pin}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="schedule" />}
            title={<a>Tanggal Pelaksanaan</a>}
            description={moment(ujian.tanggalPelaksanaan).format(
              'dddd, Do MMMM  YYYY'
            )}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="schedule" />}
            title={<a>Waktu Pelaksanaan</a>}
            description={moment(ujian.tanggalPelaksanaan).format('hh:mm a')}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="schedule" />}
            title={<a>Durasi Ujian</a>}
            description={`${ujian.durasiPengerjaan} menit`}
          />
        </List.Item>
        {/* <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon="info" />}
                          title={<a> Mata Kuliah</a>}
                          description={ujian.mataKuliah ? ujian.mataKuliah.nama : '-'}
                        />
                      </List.Item> */}

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="deployment-unit" />}
            title={<a>Jurusan</a>}
            description={ujian.prodi.jurusan.nama}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="cluster" />}
            title={<a>Program Studi</a>}
            description={ujian.prodi.nama}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="user" />}
            title={<a>Dosen</a>}
            description={ujian.dosen ? ujian.dosen.nama : '-'}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="bank" />}
            title={<a>Kelas - Mata Kuliah</a>}
            description={`${ujian.kelas.nama} - ${ujian.kelas.mataKuliah.nama}`}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="file" />}
            title={<a>Bank Soal</a>}
            description={ujian.bankSoal.nama}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="info" />}
            title={<a>Jumlah Soal</a>}
            description={ujian.JumlahSoal}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="setting" />}
            title={<a>Tingkat Kesulitan Soal Susah</a>}
            description={`${ujian.presentasiSusah}% (${Math.round(
              ujian.presentasiSusah * ujian.JumlahSoal
            ) / 100} soal)`}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="setting" />}
            title={<a>Tingkat Kesulitan Soal Sedang</a>}
            description={`${ujian.presentasiSedang}% (${Math.round(
              ujian.presentasiSedang * ujian.JumlahSoal
            ) / 100} soal)`}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="setting" />}
            title={<a>Tingkat Kesulitan Soal Mudah</a>}
            description={`${ujian.presentasiMudah}% (${Math.round(
              ujian.presentasiMudah * ujian.JumlahSoal
            ) / 100} soal)`}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="setting" />}
            title={<a>Tingkat Kesulitan Soal Acak</a>}
            description={`${100 -
              ujian.presentasiMudah -
              ujian.presentasiSedang -
              ujian.presentasiSusah}% (${Math.round(
              (100 -
                ujian.presentasiMudah -
                ujian.presentasiSedang -
                ujian.presentasiSusah) *
                ujian.JumlahSoal
            ) / 100} soal)`}
          />
        </List.Item>
      </List>
    );
  }
}