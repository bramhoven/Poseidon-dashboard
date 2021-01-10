import { HealthCheckDataItem } from "./health-check-data-item.model";
import { Server } from "./server.model";

export class HealthCheck {
    public id: string;
    public serverId: string;
    public responseTime: number;
    public date: Date;
    public dataItems: HealthCheckDataItem[];
    public server: Server;
}