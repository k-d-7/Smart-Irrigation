import { Document } from "mongoose";

export interface IPump extends Document {
    pumpStatus: boolean;
}