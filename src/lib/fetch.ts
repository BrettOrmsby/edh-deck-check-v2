export default async function http<T>(request: string): Promise<Error | T> {
  try {
    const response = await fetch(request);

    if (!response.ok) {
      return new Error(response.statusText);
    }
    const data: T = await response.json();
    return data;
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
    return new Error("There was an error.");
  }
}
