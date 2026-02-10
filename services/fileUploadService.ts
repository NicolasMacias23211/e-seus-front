import { http } from "./http";
import { env } from "../config/env";
import { SessionStorageService } from "./SessionStorageService";

export class FileUploadService {
  private baseUrl = "/upload";
  private sessionStorage = new SessionStorageService();

  /**
   * Sube uno o varios archivos al servidor
   * @param files Array de archivos a subir
   * @param ticketId ID del ticket (opcional, para organizar archivos)
   * @returns Promesa con los nombres de los archivos guardados
   */
  async uploadFiles(
    files: File[],
    ticketId?: number,
  ): Promise<{ success: boolean; data?: string[]; message?: string }> {
    try {
      const allUploadedFileNames: string[] = [];
      const token = this.sessionStorage.getAccessToken();

      // Enviar cada archivo de uno en uno
      for (let index = 0; index < files.length; index++) {
        const file = files[index];

        // Generar nombre único: timestamp_random_nombreOriginal
        const timestamp = Date.now() + index; // Añadir index para evitar mismo timestamp
        const random = Math.random().toString(36).substring(2, 15);
        const extension = file.name.substring(file.name.lastIndexOf("."));
        const nameWithoutExtension = file.name.substring(
          0,
          file.name.lastIndexOf("."),
        );
        const uniqueFileName = `${timestamp}_${random}_${nameWithoutExtension}${extension}`;

        // Crear FormData para este archivo específico
        const formData = new FormData();
        formData.append("files", file, uniqueFileName);

        // Si hay ticketId, incluirlo en el FormData
        if (ticketId) {
          formData.append("ticketId", ticketId.toString());
        }

        // Hacer la petición con fetch directamente para enviar FormData correctamente
        const headers: HeadersInit = {};

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        // NO establecer Content-Type, el navegador lo hará automáticamente con el boundary

        const response = await fetch(`${env.apiBaseUrl}${this.baseUrl}/files`, {
          method: "POST",
          headers,
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`,
          );
        }

        const data = await response.json();

        // Agregar el nombre del archivo subido al array
        if (data && data.filename) {
          allUploadedFileNames.push(data.filename);
        } else if (data && data.filenames && data.filenames.length > 0) {
          allUploadedFileNames.push(data.filenames[0]);
        } else {
          // Si no devuelve nombre, usar el que generamos
          allUploadedFileNames.push(uniqueFileName);
        }
      }

      return {
        success: true,
        data: allUploadedFileNames,
      };
    } catch (error: any) {
      console.error("Error al subir archivos:", error);
      return {
        success: false,
        message: error.message || "Error al subir archivos",
      };
    }
  }

  /**
   * Elimina un archivo del servidor
   * @param filename Nombre del archivo a eliminar
   * @returns Promesa con el resultado de la operación
   */
  async deleteFile(
    filename: string,
  ): Promise<{ success: boolean; message?: string }> {
    try {
      await http.delete(`${this.baseUrl}/files/${filename}`);
      return {
        success: true,
      };
    } catch (error: any) {
      console.error("Error al eliminar archivo:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error al eliminar archivo",
      };
    }
  }

  /**
   * Obtiene la URL de descarga de un archivo
   * @param filename Nombre del archivo
   * @returns URL de descarga
   */
  getFileUrl(filename: string): string {
    return `${env.apiBaseUrl}${this.baseUrl}/files/${filename}`;
  }

  /**
   * Descarga un archivo con autenticación
   * @param filename Nombre del archivo a descargar
   * @returns Promesa con el resultado de la operación
   */
  async downloadFile(
    filename: string,
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const token = this.sessionStorage.getAccessToken();
      const headers: HeadersInit = {};

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(
        `${env.apiBaseUrl}${this.baseUrl}/files?filename=${encodeURIComponent(filename)}`,
        {
          method: "GET",
          headers,
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Error al descargar archivo: ${response.status}`,
        );
      }

      // Convertir la respuesta a blob
      const blob = await response.blob();

      // Crear URL temporal del blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Crear elemento <a> temporal para descargar
      const link = document.createElement("a");
      link.href = blobUrl;

      // Extraer el nombre original del archivo (remover timestamp_random_)
      const parts = filename.split("_");
      const originalName =
        parts.length >= 3 ? parts.slice(2).join("_") : filename;
      link.download = originalName;

      // Añadir al DOM, hacer clic y remover
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Liberar el URL del blob
      window.URL.revokeObjectURL(blobUrl);

      return {
        success: true,
      };
    } catch (error: any) {
      console.error("Error al descargar archivo:", error);
      return {
        success: false,
        message: error.message || "Error al descargar archivo",
      };
    }
  }

  /**
   * Genera un nombre único para un archivo
   * @param originalName Nombre original del archivo
   * @returns Nombre único generado
   */
  generateUniqueFileName(originalName: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = originalName.substring(originalName.lastIndexOf("."));
    const nameWithoutExtension = originalName.substring(
      0,
      originalName.lastIndexOf("."),
    );

    return `${timestamp}_${random}_${nameWithoutExtension}${extension}`;
  }
}
