"use client";

import { useEffect, useState } from "react";
import { getProfiles, updateProfile, UserProfile } from "@/services/userProfileService";
import { Button } from "@/components/ui/Button";
import { Loader2, Download, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { BasicInfoSection } from "@/components/profile/BasicInfoSection";
import { AboutSection } from "@/components/profile/AboutSection";
import { SkillsSection } from "@/components/profile/SkillsSection";
import { ExperienceSection } from "@/components/profile/ExperienceSection";
import { EducationSection } from "@/components/profile/EducationSection";
import { CertificatesSection } from "@/components/profile/CertificatesSection";
import { AwardsSection } from "@/components/profile/AwardsSection";
import { CheckCircle2, Circle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { isAuthenticated } from "@/services/authService";

// Define proper types matching backend schema
interface Skill {
    category: string;
    skills: string[];
}

interface ProfileData {
    basic_info: any;
    about: string;
    skills: Skill[];
    experience: any[];
    education: any[];
    certificates: any[];
    awards: any[];
}

export default function ProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        // Check authentication
        if (!isAuthenticated()) {
            router.push("/login");
            return;
        }
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const profiles = await getProfiles();
            if (profiles.length > 0) {
                setProfile(profiles[0]);
            } else {
                // Initialize with proper empty structure
                setProfile({
                    id: 0,
                    name: "New Profile",
                    profile_data: {
                        basic_info: {},
                        about: "",
                        skills: [], // Empty array - will be Skill[] when populated
                        experience: [],
                        education: [],
                        certificates: [],
                        awards: []
                    }
                });
            }
        } catch (error) {
            console.error("Failed to load profile", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (section: string, data: any) => {
        if (!profile) return;

        const newProfileData = {
            ...profile.profile_data,
            [section]: data
        };

        const updatedProfile = { ...profile, profile_data: newProfileData };
        setProfile(updatedProfile);

        if (profile.id !== 0) {
            try {
                await updateProfile(profile.id, newProfileData);
            } catch (error) {
                console.error("Failed to update profile", error);
            }
        }
    };

    const calculateHealth = () => {
        if (!profile) return { score: 0, checklist: [] };
        const data = profile.profile_data as ProfileData;
        let score = 0;
        const checklist: Array<{ label: string, completed: boolean }> = [];

        // Basic Info
        if (data.basic_info?.name && data.basic_info?.email && data.basic_info?.phone) {
            score += 20;
            checklist.push({ label: "Basic Info completed", completed: true });
        } else {
            checklist.push({ label: "Add Name, Email and Phone", completed: false });
        }

        // About
        if (data.about && data.about.length > 50) {
            score += 15;
            checklist.push({ label: "About section > 50 chars", completed: true });
        } else {
            checklist.push({ label: "Add a summary (> 50 chars)", completed: false });
        }

        // Skills - count total across all categories
        const totalSkills = Array.isArray(data.skills)
            ? data.skills.reduce((acc, group) => acc + (group.skills?.length || 0), 0)
            : 0;

        if (totalSkills >= 5) {
            score += 15;
            checklist.push({ label: "Added 5+ skills", completed: true });
        } else {
            checklist.push({ label: "Add at least 5 skills", completed: false });
        }

        // Experience
        if (data.experience && data.experience.length > 0) {
            score += 20;
            checklist.push({ label: "Added experience", completed: true });
        } else {
            checklist.push({ label: "Add work experience", completed: false });
        }

        // Education
        if (data.education && data.education.length > 0) {
            score += 15;
            checklist.push({ label: "Added education", completed: true });
        } else {
            checklist.push({ label: "Add education", completed: false });
        }

        // Extras
        if ((data.certificates && data.certificates.length > 0) || (data.awards && data.awards.length > 0)) {
            score += 15;
            checklist.push({ label: "Added certificates or awards", completed: true });
        } else {
            checklist.push({ label: "Add certificates or awards", completed: false });
        }

        return { score: Math.min(score, 100), checklist };
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-gold-600" />
            </div>
        );
    }

    if (!profile) {
        return <div>Failed to load profile.</div>;
    }

    const { score, checklist } = calculateHealth();

    return (
        <>
            <Navbar />
            <div className="container mx-auto py-8 px-4 max-w-6xl mt-20">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                    <div className="space-x-4">
                        <Button variant="outline" onClick={() => router.push("/builder")}>
                            <FileText className="w-4 h-4 mr-2" />
                            Resume Manager
                        </Button>
                        <Button className="bg-purple-700 hover:bg-purple-800 text-white">
                            <Download className="w-4 h-4 mr-2" />
                            Export as resume
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <BasicInfoSection
                            data={profile.profile_data.basic_info}
                            onSave={(data) => handleUpdate("basic_info", data)}
                        />

                        <AboutSection
                            data={profile.profile_data.about}
                            onSave={(data) => handleUpdate("about", data)}
                        />

                        <SkillsSection
                            data={profile.profile_data.skills}
                            onSave={(data) => handleUpdate("skills", data)}
                        />

                        <ExperienceSection
                            data={profile.profile_data.experience}
                            onSave={(data) => handleUpdate("experience", data)}
                        />

                        <EducationSection
                            data={profile.profile_data.education}
                            onSave={(data) => handleUpdate("education", data)}
                        />

                        <CertificatesSection
                            data={profile.profile_data.certificates}
                            onSave={(data) => handleUpdate("certificates", data)}
                        />

                        <AwardsSection
                            data={profile.profile_data.awards}
                            onSave={(data) => handleUpdate("awards", data)}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 text-center sticky top-6">
                            <div className="relative w-32 h-32 mx-auto mb-4">
                                <div className="w-full h-full rounded-full border-4 border-gray-100 flex items-center justify-center relative">
                                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                                        <path
                                            className="text-gray-200"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                        />
                                        <path
                                            className={`${score === 100 ? "text-green-500" : "text-teal-600"} transition-all duration-1000 ease-out`}
                                            strokeDasharray={`${score}, 100`}
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                        />
                                    </svg>
                                    <span className="text-3xl font-bold text-gray-700">{score}</span>
                                </div>
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 mb-6">Profile health</h3>

                            <div className="text-left space-y-3">
                                {checklist.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 text-sm">
                                        {item.completed ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-gray-300 shrink-0" />
                                        )}
                                        <span className={item.completed ? "text-gray-700" : "text-gray-400"}>
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
