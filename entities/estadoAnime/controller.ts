import express from "express";
import EstusAnime from "./model.js";

export const getStatus = async (token) => {
    if (token) {
        return await EstusAnime.find({});
    }
    throw new Error('NOT_AUTHORIZED');
  };