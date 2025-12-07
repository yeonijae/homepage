/**
 * Theme System - 연이재 테마 로더 및 적용 유틸리티
 */

import fs from 'fs';
import path from 'path';

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  background: string;
  backgroundAlt: string;
  backgroundDark: string;
  backgroundDarker: string;
  surface: string;
  surfaceDark: string;
  surfaceAccent: string;
  text: string;
  textLight: string;
  textLighter: string;
  textMuted: string;
  textOnDark: string;
  textOnDarkMuted: string;
  textOnDarkSubtle: string;
  border: string;
}

export interface ThemeTypography {
  headingFont: string;
  bodyFont: string;
  heroSize: string;
  h1Size: string;
  h2Size: string;
  h3Size: string;
  bodySize: string;
  bodyLarge: string;
  small: string;
  tiny: string;
  micro: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: Record<string, unknown>;
  effects: Record<string, unknown>;
  animations: Record<string, unknown>;
  components: Record<string, unknown>;
  decorative: Record<string, unknown>;
}

// 카테고리별 기본 테마 매핑
const categoryThemeMap: Record<string, string> = {
  '여성질환': 'womens-health',
  '소화기': 'digestive',
  '피부질환': 'skin',
  '척추관절': 'musculoskeletal',
  'default': 'yonyejae-brand',
};

/**
 * 테마 JSON 파일 로드
 */
export async function loadTheme(themeId: string): Promise<Theme | null> {
  try {
    const themePath = path.join(process.cwd(), 'data', 'themes', `${themeId}.json`);
    const themeData = fs.readFileSync(themePath, 'utf-8');
    return JSON.parse(themeData) as Theme;
  } catch (error) {
    console.error(`Failed to load theme: ${themeId}`, error);
    return null;
  }
}

/**
 * 카테고리에 맞는 테마 ID 가져오기
 */
export function getThemeIdForCategory(category: string): string {
  return categoryThemeMap[category] || categoryThemeMap['default'];
}

/**
 * 테마를 CSS 변수 문자열로 변환
 */
export function themeToCssVariables(theme: Theme): string {
  const cssVars: string[] = [];

  // Colors
  if (theme.colors) {
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        cssVars.push(`--theme-color-${cssKey}: ${value};`);
      }
    });
  }

  // Typography
  if (theme.typography) {
    Object.entries(theme.typography).forEach(([key, value]) => {
      if (typeof value === 'string') {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        cssVars.push(`--theme-${cssKey}: ${value};`);
      }
    });
  }

  return cssVars.join('\n');
}

/**
 * 기본 브랜드 테마 로드
 */
export async function loadBrandTheme(): Promise<Theme | null> {
  return loadTheme('yonyejae-brand');
}
