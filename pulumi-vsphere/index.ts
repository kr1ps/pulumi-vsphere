import * as pulumi from "@pulumi/pulumi";
import * as vsphere from "@pulumi/vsphere"

let dc = pulumi.output(vsphere.getDatacenter({
    name: "kr1ps-DC"
}));

let folder = new vsphere.Folder("Pulumi Builds", {
    datacenterId: dc.apply(dc => dc.id),
    path: "Pulumi Builds",
    type: "vm",
    });

let cluster = dc.apply(dc => vsphere.getComputeCluster({
    datacenterId: dc.id,
    name: "kr1ps-cl01"
}));

let resourcePool = new vsphere.ResourcePool("Pulumi ResourcesPool", {
    parentResourcePoolId: cluster.apply(cluster => cluster.resourcePoolId),
});

let datastoreId = dc.apply(dc => vsphere.getDatastore({
    datacenterId: dc.id,
    name: "esx01_ssd-1tb"
}));

let networkId = dc.apply(dc => vsphere.getNetwork({
    datacenterId: dc.id,
    name: "server-net"
}));

let template = dc.apply(dc => vsphere.getVirtualMachine({
    datacenterId: dc.id,
    name: "tpl-ubuntu-2104"
}));


//Create rke01 VMs

let rke01 = new vsphere.VirtualMachine("rke01.kr1ps.com", {
    resourcePoolId: resourcePool.id,
    datastoreId: datastoreId.id,
    folder: folder.path,
    numCpus: 6,
    memory: 8192,
    guestId: template.guestId,
    networkInterfaces: [{
        networkId: networkId.id,
        adapterType: template.networkInterfaceTypes[0],
    }],
    disks: [{
        label: "disk0",
        size: template.disks[0].size,
        eagerlyScrub: template.disks[0].eagerlyScrub,
        thinProvisioned: template.disks[0].thinProvisioned,
    }],
    clone: {
        templateUuid: template.id,
        customize: {
            dnsServerLists: ["172.18.0.1"],
            dnsSuffixLists: ["kr1ps.com"],
            ipv4Gateway: "172.18.0.1",
            linuxOptions: {
                domain: "kr1ps.com",
                hostName: "rke01"
            },
            networkInterfaces: [{
                dnsDomain: "kr1ps.com",
                ipv4Address: "172.18.0.21",
                ipv4Netmask: 24,
                dnsServerLists: ["172.18.0.1"]
            }]
        }
    },
});

//Create rke02 VMs

let rke02 = new vsphere.VirtualMachine("rke02.kr1ps.com", {
    resourcePoolId: resourcePool.id,
    datastoreId: datastoreId.id,
    folder: folder.path,
    numCpus: 6,
    memory: 8192,
    guestId: template.guestId,
    networkInterfaces: [{
        networkId: networkId.id,
        adapterType: template.networkInterfaceTypes[0],
    }],
    disks: [{
        label: "disk0",
        size: template.disks[0].size,
        eagerlyScrub: template.disks[0].eagerlyScrub,
        thinProvisioned: template.disks[0].thinProvisioned,
    }],
    clone: {
        templateUuid: template.id,
        customize: {
            dnsServerLists: ["172.18.0.1"],
            dnsSuffixLists: ["kr1ps.com"],
            ipv4Gateway: "172.18.0.1",
            linuxOptions: {
                domain: "kr1ps.com",
                hostName: "rke02"
            },
            networkInterfaces: [{
                dnsDomain: "kr1ps.com",
                ipv4Address: "172.18.0.22",
                ipv4Netmask: 24,
                dnsServerLists: ["172.18.0.1"]
            }]
        }
    },
});


//Create rke03 VMs

let rke03 = new vsphere.VirtualMachine("rke03.kr1ps.com", {
    resourcePoolId: resourcePool.id,
    datastoreId: datastoreId.id,
    folder: folder.path,
    numCpus: 6,
    memory: 8192,
    guestId: template.guestId,
    networkInterfaces: [{
        networkId: networkId.id,
        adapterType: template.networkInterfaceTypes[0],
    }],
    disks: [{
        label: "disk0",
        size: template.disks[0].size,
        eagerlyScrub: template.disks[0].eagerlyScrub,
        thinProvisioned: template.disks[0].thinProvisioned,
    }],
    clone: {
        templateUuid: template.id,
        customize: {
            dnsServerLists: ["172.18.0.1"],
            dnsSuffixLists: ["kr1ps.com"],
            ipv4Gateway: "172.18.0.1",
            linuxOptions: {
                domain: "kr1ps.com",
                hostName: "rke03"
            },
            networkInterfaces: [{
                dnsDomain: "kr1ps.com",
                ipv4Address: "172.18.0.23",
                ipv4Netmask: 24,
                dnsServerLists: ["172.18.0.1"]
            }]
        }
    },
});

