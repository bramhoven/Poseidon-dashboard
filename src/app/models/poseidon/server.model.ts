export class Server {
    public id: string;
    public cloudId: string;
    public name: string;
    public ipAddresses: any[];
    public mainIpAddress: string;

    constructor(id: string, cloudId: string, name: string, ipAddresses: any[], mainIpAddress: string) {
        this.id = id;
        this.cloudId = cloudId;
        this.name = name;
        this.ipAddresses = ipAddresses;
        this.mainIpAddress = mainIpAddress;
    }
}