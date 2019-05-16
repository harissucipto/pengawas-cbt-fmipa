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
            avatar={
              <Avatar style={{ backgroundColor: 'maroon' }} icon="info" />
            }
            title={<a>Nama Ujian</a>}
            description={ujian.nama}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar style={{ backgroundColor: 'brown' }} icon="info" />}
            title={<a>Pin Ujian</a>}
            description={ujian.pin}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar icon="schedule" style={{ backgroundColor: 'olive' }} />
            }
            title={<a>Tanggal Pelaksanaan</a>}
            description={moment(ujian.tanggalPelaksanaan).format(
              'dddd, Do MMMM  YYYY'
            )}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar icon="schedule" style={{ backgroundColor: 'teal' }} />
            }
            title={<a>Waktu Pelaksanaan</a>}
            description={moment(ujian.tanggalPelaksanaan).format('hh:mm a')}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar style={{ backgroundColor: 'navy' }} icon="schedule" />
            }
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
            avatar={
              <Avatar
                icon="deployment-unit"
                style={{ backgroundColor: 'black' }}
              />
            }
            title={<a>Jurusan</a>}
            description={ujian.prodi.jurusan.nama}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar icon="cluster" style={{ backgroundColor: 'lime' }} />
            }
            title={<a>Program Studi</a>}
            description={ujian.prodi.nama}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="user" style={{ backgroundColor: 'green' }} />}
            title={<a>Dosen</a>}
            description={ujian.dosen ? ujian.dosen.nama : '-'}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="bank" style={{ backgroundColor: 'cyan' }} />}
            title={<a>Kelas - Mata Kuliah</a>}
            description={`${ujian.kelas.nama} - ${ujian.kelas.mataKuliah.nama}`}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar icon="file" style={{ backgroundColor: 'purple' }} />
            }
            title={<a>Bank Soal</a>}
            description={ujian.bankSoal.nama}
          />
        </List.Item>

        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar icon="info" style={{ backgroundColor: 'magenta' }} />
            }
            title={<a>Jumlah Soal</a>}
            description={ujian.soals.length}
          />
        </List.Item>
      </List>
    );
  }
}
