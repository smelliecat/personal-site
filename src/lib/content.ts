import fs from 'fs'
import path from 'path'
import type { Profile, NewsItem, Publication, Project, Course, ServiceCategory } from '@/types'

const contentDir = path.join(process.cwd(), 'content')

function readJson<T>(filename: string): T {
  const filePath = path.join(contentDir, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as T
}

export function getProfile(): Profile {
  return readJson<Profile>('profile.json')
}

export function getNews(): NewsItem[] {
  return readJson<NewsItem[]>('news.json')
}

export function getPublications(): Publication[] {
  return readJson<Publication[]>('publications.json')
}

export function getProjects(): Project[] {
  return readJson<Project[]>('projects.json')
}

export function getTeaching(): Course[] {
  return readJson<Course[]>('teaching.json')
}

export function getService(): ServiceCategory[] {
  return readJson<ServiceCategory[]>('service.json')
}
