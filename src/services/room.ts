import { Room } from '../interfaces/room';
import { RoomModel } from "../models/room";
import { ErrorApi } from "../utils/error";
import { ServicesGeneric } from "../utils/services";

export class RoomService extends ServicesGeneric<Room> {
    constructor() {
        super(RoomModel);
    }

   
    async addRoom(room: Room): Promise<Room> {
        try {
            
            const existingRoom = await this.model.findOne({ number: room.number }).exec();
            if (existingRoom) {
                throw ErrorApi.fromMessage('Room with this number already exists').withStatus(400);
            }

            
            const newRoom = await this.model.create(room);
            return newRoom;
        } catch (error) {
            if (error instanceof ErrorApi) {
                throw error;
            }
            throw ErrorApi.fromMessage('Failed to add room').withStatus(500);
        }
    }

    
    async updateRoom(id: string, roomData: Partial<Room>): Promise<Room | null> {
        try {
            const updatedRoom = await this.model.findByIdAndUpdate(id, roomData, { new: true }).exec();
            if (!updatedRoom) {
                throw ErrorApi.fromMessage('Room not found').withStatus(404);
            }
            return updatedRoom;
        } catch (error) {
            throw ErrorApi.fromMessage('Failed to update room').withStatus(500);
        }
    }

    
    async deleteRoom(id: string): Promise<Room | null> {
        try {
            const deletedRoom = await this.model.findByIdAndDelete(id).exec();
            if (!deletedRoom) {
                throw ErrorApi.fromMessage('Room not found').withStatus(404);
            }
            return deletedRoom;
        } catch (error) {
            throw ErrorApi.fromMessage('Failed to delete room').withStatus(500);
        }
    }

   
    async getRoomById(id: string): Promise<Room | null> {
        try {
            const room = await this.model.findById(id).exec();
            if (!room) {
                throw ErrorApi.fromMessage('Room not found').withStatus(404);
            }
            return room;
        } catch (error) {
            throw ErrorApi.fromMessage('Failed to get room').withStatus(500);
        }
    }

    
    async getAllRooms(): Promise<Room[]> {
        try {
            const rooms = await this.model.find().exec();
            return rooms;
        } catch (error) {
            throw ErrorApi.fromMessage('Failed to get rooms').withStatus(500);
        }
    }
}