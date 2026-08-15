"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/db/supabaseClient";
import {
  initialSettings,
  initialMessages,
  initialMinistryPosts,
  initialShopItems,
  initialNews,
  initialEvents,
  initialVolunteers,
  initialMissionaryProjects,
  Settings,
  DBMessage,
  MinistryPost,
  ShopItem,
  NewsPost,
  EventItem,
  Volunteer,
  MissionaryProject,
  initialBirthdays,
  BirthdayItem,
  initialMuralPosts,
  MuralPost,
  MuralStatus,
} from "@/db/mockData";

interface DataContextProps {
  settings: Settings;
  messages: DBMessage[];
  ministryPosts: MinistryPost[];
  shopItems: ShopItem[];
  news: NewsPost[];
  events: EventItem[];
  volunteers: Volunteer[];
  missionaryProjects: MissionaryProject[];
  birthdays: BirthdayItem[];
  muralPosts: MuralPost[];
  loading: boolean;
  
  updateSettings: (newSettings: Settings) => Promise<boolean>;
  addMessage: (msg: Omit<DBMessage, "id">) => Promise<boolean>;
  updateMessage: (msg: DBMessage) => Promise<boolean>;
  deleteMessage: (id: string) => Promise<boolean>;
  
  addMinistryPost: (post: Omit<MinistryPost, "id">) => Promise<boolean>;
  updateMinistryPost: (post: MinistryPost) => Promise<boolean>;
  deleteMinistryPost: (id: string) => Promise<boolean>;
  
  addShopItem: (item: Omit<ShopItem, "id">) => Promise<boolean>;
  updateShopItem: (item: ShopItem) => Promise<boolean>;
  deleteShopItem: (id: string) => Promise<boolean>;
  
  addNewsPost: (post: Omit<NewsPost, "id">) => Promise<boolean>;
  updateNewsPost: (post: NewsPost) => Promise<boolean>;
  deleteNewsPost: (id: string) => Promise<boolean>;
  
  addEvent: (evt: Omit<EventItem, "id">) => Promise<boolean>;
  updateEvent: (evt: EventItem) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
  
  addVolunteer: (vol: Omit<Volunteer, "id" | "date">) => Promise<boolean>;
  updateMissionaryProject: (proj: MissionaryProject) => Promise<boolean>;
  addBirthday: (bday: Omit<BirthdayItem, "id">) => Promise<boolean>;
  updateBirthday: (bday: BirthdayItem) => Promise<boolean>;
  deleteBirthday: (id: string) => Promise<boolean>;
  
  addMuralPost: (post: Omit<MuralPost, "id" | "created_at" | "prayed_count" | "status"> & { status?: MuralStatus }) => Promise<boolean>;
  updateMuralPostStatus: (id: string, status: MuralStatus) => Promise<boolean>;
  deleteMuralPost: (id: string) => Promise<boolean>;
  incrementPrayedCount: (id: string) => Promise<boolean>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [messages, setMessages] = useState<DBMessage[]>([]);
  const [ministryPosts, setMinistryPosts] = useState<MinistryPost[]>([]);
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [news, setNews] = useState<NewsPost[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [missionaryProjects, setMissionaryProjects] = useState<MissionaryProject[]>([]);
  const [birthdays, setBirthdays] = useState<BirthdayItem[]>([]);
  const [muralPosts, setMuralPosts] = useState<MuralPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper to load local storage
  const loadLocalData = () => {
    const localSettings = localStorage.getItem("db_settings");
    const localMessages = localStorage.getItem("db_messages");
    const localMinistryPosts = localStorage.getItem("db_ministry_posts");
    const localShopItems = localStorage.getItem("db_shop_items");
    const localNews = localStorage.getItem("db_news");
    const localEvents = localStorage.getItem("db_events");
    const localVolunteers = localStorage.getItem("db_volunteers");
    const localProjects = localStorage.getItem("db_missionary_projects");
    const localBirthdays = localStorage.getItem("db_birthdays");
    const localMural = localStorage.getItem("db_mural_posts");

    if (localSettings) {
      setSettings({ ...initialSettings, ...JSON.parse(localSettings) });
    } else {
      localStorage.setItem("db_settings", JSON.stringify(initialSettings));
    }

    if (localMessages) setMessages(JSON.parse(localMessages));
    else {
      setMessages(initialMessages);
      localStorage.setItem("db_messages", JSON.stringify(initialMessages));
    }

    if (localMinistryPosts) setMinistryPosts(JSON.parse(localMinistryPosts));
    else {
      setMinistryPosts(initialMinistryPosts);
      localStorage.setItem("db_ministry_posts", JSON.stringify(initialMinistryPosts));
    }

    if (localShopItems) setShopItems(JSON.parse(localShopItems));
    else {
      setShopItems(initialShopItems);
      localStorage.setItem("db_shop_items", JSON.stringify(initialShopItems));
    }

    if (localNews) setNews(JSON.parse(localNews));
    else {
      setNews(initialNews);
      localStorage.setItem("db_news", JSON.stringify(initialNews));
    }

    if (localEvents) setEvents(JSON.parse(localEvents));
    else {
      setEvents(initialEvents);
      localStorage.setItem("db_events", JSON.stringify(initialEvents));
    }

    if (localVolunteers) setVolunteers(JSON.parse(localVolunteers));
    else {
      setVolunteers(initialVolunteers);
      localStorage.setItem("db_volunteers", JSON.stringify(initialVolunteers));
    }

    if (localProjects) setMissionaryProjects(JSON.parse(localProjects));
    else {
      setMissionaryProjects(initialMissionaryProjects);
      localStorage.setItem("db_missionary_projects", JSON.stringify(initialMissionaryProjects));
    }

    if (localBirthdays) setBirthdays(JSON.parse(localBirthdays));
    else {
      setBirthdays(initialBirthdays);
      localStorage.setItem("db_birthdays", JSON.stringify(initialBirthdays));
    }

    if (localMural) setMuralPosts(JSON.parse(localMural));
    else {
      setMuralPosts(initialMuralPosts);
      localStorage.setItem("db_mural_posts", JSON.stringify(initialMuralPosts));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (supabase) {
        try {
          // If Supabase is connected, we try to load from it. 
          // However, to avoid errors due to missing tables, we handle errors and fallback to local.
          const { data: settingsData, error: settingsError } = await supabase.from("settings").select("*").single();
          const { data: messagesData, error: messagesError } = await supabase.from("messages").select("*");
          const { data: ministryData, error: ministryError } = await supabase.from("ministry_posts").select("*");
          const { data: shopData, error: shopError } = await supabase.from("shop_items").select("*");
          const { data: newsData, error: newsError } = await supabase.from("news").select("*");
          const { data: eventsData, error: eventsError } = await supabase.from("events").select("*");
          const { data: volunteersData, error: volunteersError } = await supabase.from("volunteers").select("*");
          const { data: projectsData, error: projectsError } = await supabase.from("missionary_projects").select("*");
          const { data: birthdaysData, error: birthdaysError } = await supabase.from("birthdays").select("*");

          if (!settingsError && settingsData) {
            const localSettings = localStorage.getItem("db_settings");
            const localSettingsObj = localSettings ? JSON.parse(localSettings) : {};
            const mergedSettings = { ...initialSettings, ...localSettingsObj };
            Object.keys(settingsData).forEach((key) => {
              const val = (settingsData as any)[key];
              if (val !== undefined && val !== null) {
                (mergedSettings as any)[key] = val;
              }
            });
            setSettings(mergedSettings);
          }
          if (!messagesError && messagesData) setMessages(messagesData);
          if (!ministryError && ministryData) setMinistryPosts(ministryData);
          if (!shopError && shopData) setShopItems(shopData);
          if (!newsError && newsData) setNews(newsData);
          if (!eventsError && eventsData) setEvents(eventsData);
          if (!volunteersError && volunteersData) setVolunteers(volunteersData);
          if (!projectsError && projectsData) setMissionaryProjects(projectsData);
          if (!birthdaysError && birthdaysData) setBirthdays(birthdaysData);

          // If there were any table errors, fallback to local storage
          if (settingsError || messagesError || ministryError || shopError || newsError || eventsError || birthdaysError) {
            console.log("Supabase connected but some tables are missing. Falling back to LocalStorage.");
            loadLocalData();
          }
        } catch (e) {
          console.error("Supabase query error, falling back to LocalStorage", e);
          loadLocalData();
        }
      } else {
        loadLocalData();
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Update Settings
  const updateSettings = async (newSettings: Settings): Promise<boolean> => {
    setSettings(newSettings);
    localStorage.setItem("db_settings", JSON.stringify(newSettings));
    
    if (supabase) {
      try {
        const { error } = await supabase.from("settings").upsert({ id: 1, ...newSettings });
        if (error) console.error("Error updating Supabase settings:", error);
      } catch (e) {
        console.error("Supabase upsert error:", e);
      }
    }
    return true;
  };

  // Messages Actions
  const addMessage = async (msg: Omit<DBMessage, "id">): Promise<boolean> => {
    const newMessage: DBMessage = { ...msg, id: `msg-${Date.now()}` };
    const list = [newMessage, ...messages];
    setMessages(list);
    localStorage.setItem("db_messages", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("messages").insert([msg]);
        if (error) console.error("Supabase insert error:", error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  const updateMessage = async (msg: DBMessage): Promise<boolean> => {
    const list = messages.map((m) => (m.id === msg.id ? msg : m));
    setMessages(list);
    localStorage.setItem("db_messages", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("messages").update(msg).eq("id", msg.id);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  const deleteMessage = async (id: string): Promise<boolean> => {
    const list = messages.filter((m) => m.id !== id);
    setMessages(list);
    localStorage.setItem("db_messages", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("messages").delete().eq("id", id);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  // Ministry Posts Actions
  const addMinistryPost = async (post: Omit<MinistryPost, "id">): Promise<boolean> => {
    const newPost: MinistryPost = { ...post, id: `min-${Date.now()}` };
    const list = [newPost, ...ministryPosts];
    setMinistryPosts(list);
    localStorage.setItem("db_ministry_posts", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("ministry_posts").insert([post]);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  const updateMinistryPost = async (post: MinistryPost): Promise<boolean> => {
    const list = ministryPosts.map((p) => (p.id === post.id ? post : p));
    setMinistryPosts(list);
    localStorage.setItem("db_ministry_posts", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("ministry_posts").update(post).eq("id", post.id);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  const deleteMinistryPost = async (id: string): Promise<boolean> => {
    const list = ministryPosts.filter((p) => p.id !== id);
    setMinistryPosts(list);
    localStorage.setItem("db_ministry_posts", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("ministry_posts").delete().eq("id", id);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  // Shop Items Actions
  const addShopItem = async (item: Omit<ShopItem, "id">): Promise<boolean> => {
    const newItem: ShopItem = { ...item, id: `shop-${Date.now()}` };
    const list = [newItem, ...shopItems];
    setShopItems(list);
    localStorage.setItem("db_shop_items", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("shop_items").insert([item]);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  const updateShopItem = async (item: ShopItem): Promise<boolean> => {
    const list = shopItems.map((s) => (s.id === item.id ? item : s));
    setShopItems(list);
    localStorage.setItem("db_shop_items", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("shop_items").update(item).eq("id", item.id);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  const deleteShopItem = async (id: string): Promise<boolean> => {
    const list = shopItems.filter((s) => s.id !== id);
    setShopItems(list);
    localStorage.setItem("db_shop_items", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("shop_items").delete().eq("id", id);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  // News Actions
  const addNewsPost = async (post: Omit<NewsPost, "id">): Promise<boolean> => {
    const newPost: NewsPost = { ...post, id: `news-${Date.now()}` };
    const list = [newPost, ...news];
    setNews(list);
    localStorage.setItem("db_news", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("news").insert([post]);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  const updateNewsPost = async (post: NewsPost): Promise<boolean> => {
    const list = news.map((n) => (n.id === post.id ? post : n));
    setNews(list);
    localStorage.setItem("db_news", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("news").update(post).eq("id", post.id);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  const deleteNewsPost = async (id: string): Promise<boolean> => {
    const list = news.filter((n) => n.id !== id);
    setNews(list);
    localStorage.setItem("db_news", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("news").delete().eq("id", id);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  // Events Actions
  const addEvent = async (evt: Omit<EventItem, "id">): Promise<boolean> => {
    const newEvent: EventItem = { ...evt, id: `evt-${Date.now()}` };
    const list = [newEvent, ...events];
    setEvents(list);
    localStorage.setItem("db_events", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("events").insert([evt]);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  const updateEvent = async (evt: EventItem): Promise<boolean> => {
    const list = events.map((e) => (e.id === evt.id ? evt : e));
    setEvents(list);
    localStorage.setItem("db_events", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("events").update(evt).eq("id", evt.id);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  const deleteEvent = async (id: string): Promise<boolean> => {
    const list = events.filter((e) => e.id !== id);
    setEvents(list);
    localStorage.setItem("db_events", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("events").delete().eq("id", id);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  // Volunteer Signup
  const addVolunteer = async (vol: Omit<Volunteer, "id" | "date">): Promise<boolean> => {
    const newVol: Volunteer = {
      ...vol,
      id: `vol-${Date.now()}`,
      date: new Date().toISOString(),
    };
    const list = [newVol, ...volunteers];
    setVolunteers(list);
    localStorage.setItem("db_volunteers", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("volunteers").insert([newVol]);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  // Missionary Project Donation Update
  const updateMissionaryProject = async (proj: MissionaryProject): Promise<boolean> => {
    const list = missionaryProjects.map((p) => (p.id === proj.id ? proj : p));
    setMissionaryProjects(list);
    localStorage.setItem("db_missionary_projects", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("missionary_projects").update(proj).eq("id", proj.id);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  // Birthday Actions
  const addBirthday = async (bday: Omit<BirthdayItem, "id">): Promise<boolean> => {
    const newBday: BirthdayItem = { ...bday, id: `bday-${Date.now()}` };
    const list = [newBday, ...birthdays];
    setBirthdays(list);
    localStorage.setItem("db_birthdays", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("birthdays").insert([newBday]);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  const updateBirthday = async (bday: BirthdayItem): Promise<boolean> => {
    const list = birthdays.map((b) => (b.id === bday.id ? bday : b));
    setBirthdays(list);
    localStorage.setItem("db_birthdays", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("birthdays").update(bday).eq("id", bday.id);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  const deleteBirthday = async (id: string): Promise<boolean> => {
    const list = birthdays.filter((b) => b.id !== id);
    setBirthdays(list);
    localStorage.setItem("db_birthdays", JSON.stringify(list));

    if (supabase) {
      try {
        const { error } = await supabase.from("birthdays").delete().eq("id", id);
        if (error) console.error(error);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  const addMuralPost = async (
    postData: Omit<MuralPost, "id" | "created_at" | "prayed_count" | "status"> & { status?: MuralStatus }
  ) => {
    const defaultStatus: MuralStatus = settings.mural_auto_approve ? "approved" : "pending";
    const newPost: MuralPost = {
      ...postData,
      id: `mural-${Date.now()}`,
      created_at: new Date().toISOString(),
      prayed_count: 0,
      status: postData.status || defaultStatus,
    };
    const updated = [newPost, ...muralPosts];
    setMuralPosts(updated);
    localStorage.setItem("db_mural_posts", JSON.stringify(updated));

    if (supabase) {
      try {
        await supabase.from("mural_posts").insert(newPost);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  const updateMuralPostStatus = async (id: string, status: MuralStatus) => {
    const updated = muralPosts.map((p) => (p.id === id ? { ...p, status } : p));
    setMuralPosts(updated);
    localStorage.setItem("db_mural_posts", JSON.stringify(updated));

    if (supabase) {
      try {
        await supabase.from("mural_posts").update({ status }).eq("id", id);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  const deleteMuralPost = async (id: string) => {
    const updated = muralPosts.filter((p) => p.id !== id);
    setMuralPosts(updated);
    localStorage.setItem("db_mural_posts", JSON.stringify(updated));

    if (supabase) {
      try {
        await supabase.from("mural_posts").delete().eq("id", id);
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  const incrementPrayedCount = async (id: string) => {
    const updated = muralPosts.map((p) =>
      p.id === id ? { ...p, prayed_count: p.prayed_count + 1 } : p
    );
    setMuralPosts(updated);
    localStorage.setItem("db_mural_posts", JSON.stringify(updated));

    if (supabase) {
      try {
        const target = muralPosts.find((p) => p.id === id);
        if (target) {
          await supabase
            .from("mural_posts")
            .update({ prayed_count: target.prayed_count + 1 })
            .eq("id", id);
        }
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  };

  return (
    <DataContext.Provider
      value={{
        settings,
        messages,
        ministryPosts,
        shopItems,
        news,
        events,
        volunteers,
        missionaryProjects,
        birthdays,
        muralPosts,
        loading,
        updateSettings,
        addMessage,
        updateMessage,
        deleteMessage,
        addMinistryPost,
        updateMinistryPost,
        deleteMinistryPost,
        addShopItem,
        updateShopItem,
        deleteShopItem,
        addNewsPost,
        updateNewsPost,
        deleteNewsPost,
        addEvent,
        updateEvent,
        deleteEvent,
        addVolunteer,
        updateMissionaryProject,
        addBirthday,
        updateBirthday,
        deleteBirthday,
        addMuralPost,
        updateMuralPostStatus,
        deleteMuralPost,
        incrementPrayedCount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
