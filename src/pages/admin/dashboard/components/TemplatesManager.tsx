import { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabase';

interface Template {
  id: string;
  title: string;
  description: string;
  file_url: string;
  price_kes: number;
  preview_image_url: string;
  preview_text: string;
  is_active: boolean;
  created_at: string;
}

export default function TemplatesManager() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file_url: '',
    price_kes: 150,
    preview_image_url: '',
    preview_text: '',
    is_active: true,
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setTemplates(data);
    }
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('TEMPLATES')
      .upload(filePath, file);

    if (uploadError) {
      alert('Error uploading file: ' + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('TEMPLATES')
      .getPublicUrl(filePath);

    setFormData({ ...formData, file_url: publicUrl });
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.file_url) {
      alert('Please upload a template file');
      return;
    }

    if (editingTemplate) {
      const { error } = await supabase
        .from('templates')
        .update(formData)
        .eq('id', editingTemplate.id);

      if (!error) {
        alert('Template updated successfully!');
        resetForm();
        fetchTemplates();
      } else {
        alert('Error updating template: ' + error.message);
      }
    } else {
      const { error } = await supabase.from('templates').insert([formData]);

      if (!error) {
        alert('Template created successfully!');
        resetForm();
        fetchTemplates();
      } else {
        alert('Error creating template: ' + error.message);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    const { error } = await supabase.from('templates').delete().eq('id', id);

    if (!error) {
      alert('Template deleted successfully!');
      fetchTemplates();
    } else {
      alert('Error deleting template: ' + error.message);
    }
  };

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
    setFormData({
      title: template.title,
      description: template.description,
      file_url: template.file_url,
      price_kes: template.price_kes,
      preview_image_url: template.preview_image_url,
      preview_text: template.preview_text || '',
      is_active: template.is_active,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      file_url: '',
      price_kes: 150,
      preview_image_url: '',
      preview_text: '',
      is_active: true,
    });
    setEditingTemplate(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <i className="ri-loader-4-line text-3xl text-amber-500 animate-spin"></i>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-neutral-800">Templates Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors whitespace-nowrap"
        >
          <i className={showForm ? 'ri-close-line' : 'ri-add-line'}></i>
          {showForm ? 'Cancel' : 'New Template'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-bold text-neutral-800 mb-4">
            {editingTemplate ? 'Edit Template' : 'Create New Template'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                placeholder="Template title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                maxLength={500}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm resize-none"
                placeholder="Template description (max 500 characters)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Template File * (.docx, .pdf, etc.)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".doc,.docx,.pdf"
                  className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                />
                {uploading && (
                  <i className="ri-loader-4-line text-xl text-amber-500 animate-spin"></i>
                )}
              </div>
              {formData.file_url && (
                <p className="text-xs text-green-600 mt-2">
                  <i className="ri-check-line"></i> File uploaded successfully
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Price (KES) *
              </label>
              <input
                type="number"
                value={formData.price_kes}
                onChange={(e) => setFormData({ ...formData, price_kes: parseInt(e.target.value) })}
                required
                min="0"
                step="50"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                placeholder="150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Preview Image URL (optional)
              </label>
              <input
                type="url"
                value={formData.preview_image_url}
                onChange={(e) => setFormData({ ...formData, preview_image_url: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                placeholder="https://example.com/preview.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Preview Text (optional — shown as partial preview to customers)
              </label>
              <textarea
                value={formData.preview_text}
                onChange={(e) => setFormData({ ...formData, preview_text: e.target.value })}
                rows={8}
                maxLength={3000}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm resize-none font-mono"
                placeholder="Paste the template text here. The first ~40% will be visible and the rest will be blurred out for customers. Leave empty to use a default legal document preview."
              />
              <p className="text-xs text-neutral-400 mt-1">
                {formData.preview_text.length}/3000 characters — Customers will see the first portion clearly, the rest is blurred
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 text-amber-500 border-neutral-300 rounded focus:ring-amber-500"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-neutral-700">
                Active (visible to customers)
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={uploading}
                className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {editingTemplate ? 'Update Template' : 'Create Template'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors whitespace-nowrap"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {templates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                    No templates yet. Create your first template!
                  </td>
                </tr>
              ) : (
                templates.map((template) => (
                  <tr key={template.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-neutral-800">{template.title}</div>
                      <div className="text-xs text-neutral-500 line-clamp-1">
                        {template.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-neutral-800">
                      KES {template.price_kes}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                          template.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        {template.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {new Date(template.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(template)}
                        className="text-amber-600 hover:text-amber-800 mr-4 whitespace-nowrap"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(template.id)}
                        className="text-red-600 hover:text-red-800 whitespace-nowrap"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
