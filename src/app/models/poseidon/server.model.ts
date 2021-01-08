import { CloudProvider } from "./cloud-provider.model";
import { PublicSshKey } from "./public-ssh-key.model";

export class Server {
    public id: string;
    public cloudId: string;
    public name: string;
    public ipAddresses: any[];
    public mainIpAddress: string;
    public cloudProvider: CloudProvider;
    public publicSshKey: PublicSshKey;
}