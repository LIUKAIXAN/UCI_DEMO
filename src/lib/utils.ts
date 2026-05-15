type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean } | ClassValue[];

export function cn(...classes: ClassValue[]): string {
  const result: string[] = [];
  
  for (const cls of classes) {
    if (!cls) continue;
    
    if (typeof cls === 'string' || typeof cls === 'number') {
      result.push(cls.toString());
    } else if (Array.isArray(cls)) {
      const inner = cn(...cls);
      if (inner) result.push(inner);
    } else if (typeof cls === 'object') {
      for (const [key, value] of Object.entries(cls)) {
        if (value) result.push(key);
      }
    }
  }
  
  return result.join(' ');
}
