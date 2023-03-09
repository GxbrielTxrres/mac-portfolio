import { create } from "zustand";

export const useCamStore = create((set) => ({
	followModel: true,
	setFollowModel: () => set(() => ({ followModel: false })),
	setFollowModelT: () => set(() => ({ followModel: true })),
}));
