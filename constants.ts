import { DocumentItem, EquipmentType, UserAccount } from './types';

// ==========================================
// INITIAL USERS
// ==========================================
export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'admin-feng-dou',
    name: 'Feng Dou',
    email: 'feng.dou@dcsstech.com',
    password: 'Doufeng1983',
    role: 'ADMIN'
  }
];

// ==========================================
// DOCUMENTS MOCK DATA
// ==========================================
// In a real app, this would come from an API or a config file mapping Box Folder IDs.
export const DOCUMENTS: DocumentItem[] = [
  // ==========================================
  // SERVERS (HPE, Dell, Fujitsu, Lenovo)
  // ==========================================
  {
    id: 'hpe-dl380-g10-hdd',
    title: 'HPE ProLiant DL380 Gen10 - HDD交換手順書',
    type: EquipmentType.SERVER,
    manufacturer: 'HPE',
    modelSeries: 'ProLiant DL Gen10',
    lastUpdated: '2024-03-10',
    boxLink: '#box-dl380-hdd',
    isFavorite: true,
    tags: ['HDD', 'Maintenance', 'Replacement'],
    description: 'ホットスワップ対応HDDの物理交換およびSmart Storage Administratorでの確認手順。'
  },
  {
    id: 'hpe-dl360-g10-fan',
    title: 'HPE ProLiant DL360 Gen10 - ファンモジュール交換',
    type: EquipmentType.SERVER,
    manufacturer: 'HPE',
    modelSeries: 'ProLiant DL Gen10',
    lastUpdated: '2023-11-05',
    boxLink: '#box-dl360-fan',
    isFavorite: false,
    tags: ['Fan', 'Cooling', 'Replacement']
  },
  {
    id: 'hpe-ilo5-fw-update',
    title: 'HPE iLO 5 - ファームウェアアップデート手順',
    type: EquipmentType.SERVER,
    manufacturer: 'HPE',
    modelSeries: 'ProLiant Gen10/Gen10+',
    lastUpdated: '2024-05-12',
    boxLink: '#box-ilo5-fw',
    isFavorite: true,
    tags: ['Firmware', 'iLO', 'Upgrade'],
    description: 'Web管理画面経由およびSUMを使用したファームウェア更新のステップバイステップガイド。'
  },
  {
    id: 'dell-r640-dimm',
    title: 'Dell EMC PowerEdge R640 - メモリ(DIMM)増設・交換手順',
    type: EquipmentType.SERVER,
    manufacturer: 'Dell',
    modelSeries: 'PowerEdge 14G',
    lastUpdated: '2024-01-20',
    boxLink: '#box-r640-dimm',
    isFavorite: false,
    tags: ['Memory', 'Upgrade', 'Replacement']
  },
  {
    id: 'dell-idrac-logs',
    title: 'Dell iDRAC9 - TSRログ取得手順',
    type: EquipmentType.SERVER,
    manufacturer: 'Dell',
    modelSeries: 'General',
    lastUpdated: '2024-04-01',
    boxLink: '#box-idrac-tsr',
    isFavorite: true,
    tags: ['Logs', 'Troubleshooting', 'iDRAC']
  },
  {
    id: 'fujitsu-rx2540-m5-sysboard',
    title: 'Fujitsu PRIMERGY RX2540 M5 - システムボード交換手順',
    type: EquipmentType.SERVER,
    manufacturer: 'Fujitsu',
    modelSeries: 'PRIMERGY RX M5',
    lastUpdated: '2023-08-15',
    boxLink: '#box-rx2540-sysboard',
    isFavorite: false,
    tags: ['Motherboard', 'Replacement', 'Heavy Maintenance'],
    description: 'システムボード交換後のシャーシID設定およびBIOSリカバリ手順を含む詳細マニュアル。'
  },
  {
    id: 'lenovo-sr650-raid',
    title: 'Lenovo ThinkSystem SR650 - RAID構成ガイド (XClarity)',
    type: EquipmentType.SERVER,
    manufacturer: 'Lenovo',
    modelSeries: 'ThinkSystem SR',
    lastUpdated: '2023-12-01',
    boxLink: '#box-sr650-raid',
    isFavorite: false,
    tags: ['RAID', 'Config', 'XClarity']
  },
  {
    id: 'oracle-t8-dimm',
    title: 'Oracle SPARC T8-1 - DIMM交換手順',
    type: EquipmentType.SERVER,
    manufacturer: 'Oracle',
    modelSeries: 'SPARC T8',
    lastUpdated: '2023-05-10',
    boxLink: '#box-oracle-dimm',
    isFavorite: false,
    tags: ['Solaris', 'Hardware', 'Memory']
  },
  {
    id: 'nutanix-nx-node',
    title: 'Nutanix NX-3060-G7 - ノード交換手順',
    type: EquipmentType.SERVER,
    manufacturer: 'Nutanix',
    modelSeries: 'NX G7',
    lastUpdated: '2024-03-01',
    boxLink: '#box-nutanix-node',
    isFavorite: false,
    tags: ['HCI', 'Maintenance', 'CVM', 'Replacement'],
    description: 'CVMの停止手順から物理交換、クラスターへの再参加・修復手順まで。'
  },

  // ==========================================
  // STORAGE (NetApp, Dell EMC, Pure, HPE)
  // ==========================================
  {
    id: 'netapp-aff-controller',
    title: 'NetApp AFF A220 - コントローラーフェイルオーバー手順',
    type: EquipmentType.STORAGE,
    manufacturer: 'NetApp',
    modelSeries: 'AFF Series',
    lastUpdated: '2023-12-15',
    boxLink: '#box-netapp-fo',
    isFavorite: true,
    tags: ['Controller', 'HA', 'Ontap'],
    description: 'メンテナンス時のテイクオーバーおよびギブバック操作コマンド詳細。'
  },
  {
    id: 'netapp-disk-assign',
    title: 'NetApp ONTAP - ディスクオーナーシップ変更手順',
    type: EquipmentType.STORAGE,
    manufacturer: 'NetApp',
    modelSeries: 'General',
    lastUpdated: '2023-09-20',
    boxLink: '#box-netapp-disk',
    isFavorite: false,
    tags: ['Disk', 'Ontap', 'Configuration']
  },
  {
    id: 'emc-unity-sp-reboot',
    title: 'Dell EMC Unity - SP再起動手順 (Service Mode)',
    type: EquipmentType.STORAGE,
    manufacturer: 'Dell EMC',
    modelSeries: 'Unity',
    lastUpdated: '2024-01-15',
    boxLink: '#box-unity-sp',
    isFavorite: false,
    tags: ['SP', 'Reboot', 'Maintenance']
  },
  {
    id: 'emc-isilon-node-replace',
    title: 'Dell EMC Isilon Gen6 - ノード交換手順',
    type: EquipmentType.STORAGE,
    manufacturer: 'Dell EMC',
    modelSeries: 'Isilon / PowerScale',
    lastUpdated: '2024-02-10',
    boxLink: '#box-isilon-node',
    isFavorite: false,
    tags: ['Node', 'Replacement', 'Smartfail'],
    description: 'Smartfailプロセスおよび物理交換、新規ノードのクラスタ参加手順。'
  },
  {
    id: 'pure-flasharray-module',
    title: 'Pure Storage FlashArray //X - Flashモジュール交換',
    type: EquipmentType.STORAGE,
    manufacturer: 'Pure Storage',
    modelSeries: 'FlashArray //X',
    lastUpdated: '2024-04-20',
    boxLink: '#box-pure-flash',
    isFavorite: true,
    tags: ['Flash', 'Replacement', 'Purity'],
    description: 'Purity GUIを使用した確認と物理交換作業のフロー。'
  },
  {
    id: 'hpe-nimble-controller',
    title: 'HPE Nimble Storage - コントローラー交換手順',
    type: EquipmentType.STORAGE,
    manufacturer: 'HPE',
    modelSeries: 'Nimble AF/HF',
    lastUpdated: '2023-10-05',
    boxLink: '#box-nimble-ctrl',
    isFavorite: false,
    tags: ['Controller', 'Replacement', 'HA']
  },

  // ==========================================
  // NETWORK (Cisco, Juniper, Fortinet, Palo Alto)
  // ==========================================
  {
    id: 'cisco-cat-ios-upgrade',
    title: 'Cisco Catalyst 2960X/9200 - IOSバージョンアップ手順',
    type: EquipmentType.NETWORK,
    manufacturer: 'Cisco',
    modelSeries: 'Catalyst',
    lastUpdated: '2024-02-28',
    boxLink: '#box-cisco-ios',
    isFavorite: false,
    tags: ['Firmware', 'Upgrade', 'IOS'],
    description: 'TFTPサーバーを使用したIOSイメージの転送とBoot変数の書き換え。'
  },
  {
    id: 'cisco-nexus-vpc',
    title: 'Cisco Nexus 9000 - vPC設定ガイド',
    type: EquipmentType.NETWORK,
    manufacturer: 'Cisco',
    modelSeries: 'Nexus 9000',
    lastUpdated: '2023-10-10',
    boxLink: '#box-nexus-vpc',
    isFavorite: false,
    tags: ['Config', 'vPC', 'Switching']
  },
  {
    id: 'juniper-ex-vlan',
    title: 'Juniper EXシリーズ - VLAN設定およびTrunk設定',
    type: EquipmentType.NETWORK,
    manufacturer: 'Juniper',
    modelSeries: 'EX Series',
    lastUpdated: '2023-07-22',
    boxLink: '#box-juniper-vlan',
    isFavorite: false,
    tags: ['VLAN', 'Config', 'Junos']
  },
  {
    id: 'fortigate-firmware',
    title: 'Fortinet FortiGate - ファームウェアアップグレードパス確認と実行',
    type: EquipmentType.NETWORK,
    manufacturer: 'Fortinet',
    modelSeries: 'FortiGate',
    lastUpdated: '2024-03-15',
    boxLink: '#box-forti-fw',
    isFavorite: true,
    tags: ['Firmware', 'Security', 'Upgrade'],
    description: 'Upgrade Path Toolを使用した適切なバージョンの選定と適用手順。'
  },
  {
    id: 'paloalto-pa3220-rma',
    title: 'Palo Alto PA-3220 - 筐体交換(RMA)手順',
    type: EquipmentType.NETWORK,
    manufacturer: 'Palo Alto',
    modelSeries: 'PA-3000 Series',
    lastUpdated: '2024-01-15',
    boxLink: '#box-pa3220-rma',
    isFavorite: true,
    tags: ['Security', 'RMA', 'Restore'],
    description: 'ライセンスのデアクティベーションとコンフィグのリストア手順。'
  },

  // ==========================================
  // LIBRARY / TAPE (IBM, HPE)
  // ==========================================
  {
    id: 'ibm-ts4300-drive',
    title: 'IBM TS4300 - テープドライブ交換手順',
    type: EquipmentType.LIBRARY,
    manufacturer: 'IBM',
    modelSeries: 'TS4300',
    lastUpdated: '2023-05-30',
    boxLink: '#box-ts4300-drive',
    isFavorite: false,
    tags: ['Tape', 'Drive', 'Replacement'],
    description: 'WebGUIからのドライブオフライン化および物理交換手順。'
  },
  {
    id: 'hpe-msl-robot',
    title: 'HPE MSL3040 - ロボットアセンブリ交換',
    type: EquipmentType.LIBRARY,
    manufacturer: 'HPE',
    modelSeries: 'MSL3040',
    lastUpdated: '2022-11-12',
    boxLink: '#box-msl-robot',
    isFavorite: false,
    tags: ['Robotics', 'Maintenance', 'Replacement']
  },

  // ==========================================
  // GENERAL / OS (VMware, Linux, Windows, DCSS Standards)
  // ==========================================
  {
    id: 'vmware-esxi-logs',
    title: 'VMware ESXi - vm-supportログ取得手順',
    type: EquipmentType.GENERAL,
    manufacturer: 'VMware',
    modelSeries: 'vSphere 7/8',
    lastUpdated: '2024-01-05',
    boxLink: '#box-esxi-logs',
    isFavorite: true,
    tags: ['Logs', 'Virtualization', 'Troubleshooting']
  },
  {
    id: 'redhat-sosreport',
    title: 'RHEL/CentOS - sosreport取得手順',
    type: EquipmentType.GENERAL,
    manufacturer: 'Red Hat',
    modelSeries: 'RHEL 7/8/9',
    lastUpdated: '2023-08-08',
    boxLink: '#box-sosreport',
    isFavorite: false,
    tags: ['Logs', 'Linux', 'Troubleshooting']
  },
  {
    id: 'apc-smt1500-battery',
    title: 'APC Smart-UPS 1500 - バッテリーモジュール交換',
    type: EquipmentType.GENERAL,
    manufacturer: 'APC (Schneider)',
    modelSeries: 'Smart-UPS',
    lastUpdated: '2022-09-01',
    boxLink: '#box-apc-batt',
    isFavorite: false,
    tags: ['UPS', 'Battery', 'Maintenance']
  },
  {
    id: 'dcss-cabling-standard',
    title: 'DCSS標準 - サーバーラック配線・整線ガイドライン',
    type: EquipmentType.GENERAL,
    manufacturer: 'DCSS',
    modelSeries: 'Standard',
    lastUpdated: '2023-04-01',
    boxLink: '#box-dcss-cabling',
    isFavorite: true,
    tags: ['Cabling', 'Best Practice', 'Training'],
    description: '電源ケーブルおよびLAN/FCケーブルの敷設ルールとベルクロ固定要領。'
  },
  {
    id: 'dcss-esd-safety',
    title: '静電気放電(ESD)対策および作業安全基準',
    type: EquipmentType.GENERAL,
    manufacturer: 'DCSS',
    modelSeries: 'Safety',
    lastUpdated: '2023-01-01',
    boxLink: '#box-dcss-esd',
    isFavorite: false,
    tags: ['Safety', 'ESD', 'Compliance']
  }
];

export const MANUFACTURERS = Array.from(new Set(DOCUMENTS.map(d => d.manufacturer)));
export const TAGS = Array.from(new Set(DOCUMENTS.flatMap(d => d.tags)));