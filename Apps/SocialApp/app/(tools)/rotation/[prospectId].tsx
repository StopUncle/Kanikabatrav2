// Prospect Detail Screen
// View and manage a single prospect

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  User,
  Heart,
  AlertTriangle,
  Calendar,
  MessageSquare,
  Phone,
  Send,
  Plus,
  Trash2,
  Edit3,
  Clock,
  Flag,
  Lightbulb,
  X,
  Check,
  MoreVertical,
} from 'lucide-react-native';
import { Button } from '../../../components/ui/Button';
import { GlassCard } from '../../../components/ui/GlassCard';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  layout,
} from '../../../lib/theme';
import { haptics } from '../../../lib/haptics';
import { useRotationStore, formatLastContact } from '../../../stores/rotationStore';
import {
  STATUS_INFO,
  INTEREST_LEVELS,
  THREAT_LEVELS,
  COMMON_RED_FLAGS,
  COMMON_GREEN_FLAGS,
  CONTACT_TYPES,
} from '../../../content/rotation/suggestions';
import { Prospect, ContactEvent } from '../../../content/rotation/types';

export default function ProspectDetailScreen() {
  const { prospectId } = useLocalSearchParams<{ prospectId: string }>();

  const {
    getProspectById,
    updateProspect,
    deleteProspect,
    addRedFlag,
    addGreenFlag,
    removeFlag,
    addTopic,
    removeTopic,
    logContact,
  } = useRotationStore();

  const prospect = getProspectById(prospectId);

  // Navigation guard to prevent double-back
  const hasNavigatedRef = useRef(false);

  // Modal states
  const [showAddFlagModal, setShowAddFlagModal] = useState(false);
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const [showLogContactModal, setShowLogContactModal] = useState(false);
  const [flagType, setFlagType] = useState<'red' | 'green'>('red');

  // Form states
  const [customFlagText, setCustomFlagText] = useState('');
  const [customFlagSeverity, setCustomFlagSeverity] = useState<1 | 2 | 3>(2);
  const [topicText, setTopicText] = useState('');
  const [topicDetails, setTopicDetails] = useState('');
  const [contactType, setContactType] = useState<ContactEvent['type']>('text');
  const [contactInitiator, setContactInitiator] = useState<'you' | 'them'>('you');
  const [contactNotes, setContactNotes] = useState('');

  useEffect(() => {
    if (!prospect && !hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      router.replace('/(tools)/rotation');
    }
  }, [prospect]);

  if (!prospect) {
    return null;
  }

  const statusInfo = STATUS_INFO[prospect.status];
  const interestInfo = INTEREST_LEVELS.find(l => l.level === prospect.interestLevel);
  const threatInfo = THREAT_LEVELS[prospect.threatLevel];

  const handleBack = () => {
    haptics.light();
    router.replace('/(tools)/rotation');
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Prospect',
      `Are you sure you want to delete ${prospect.name}? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (hasNavigatedRef.current) return;
            hasNavigatedRef.current = true;
            void deleteProspect(prospect.id).then(() => {
              router.replace('/(tools)/rotation');
            });
          },
        },
      ]
    );
  };

  const handleAddFlag = async (text: string, severity?: 1 | 2 | 3) => {
    if (flagType === 'red') {
      await addRedFlag(prospect.id, text, severity || 2);
    } else {
      await addGreenFlag(prospect.id, text);
    }
    setCustomFlagText('');
    setShowAddFlagModal(false);
  };

  const handleAddTopic = async () => {
    if (!topicText.trim()) return;
    await addTopic(prospect.id, topicText.trim(), topicDetails.trim() || undefined);
    setTopicText('');
    setTopicDetails('');
    setShowAddTopicModal(false);
  };

  const handleLogContact = async () => {
    await logContact(prospect.id, contactType, contactInitiator, contactNotes.trim() || undefined);
    setContactNotes('');
    setShowLogContactModal(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft size={20} color={colors.primary} />}
          onPress={handleBack}
        />
        <Text style={styles.title}>{prospect.nickname || prospect.name}</Text>
        <Button
          variant="ghost"
          size="sm"
          icon={<Trash2 size={20} color={colors.error} />}
          onPress={handleDelete}
        />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <GlassCard variant="gold" glow style={styles.profileCard}>
          <View style={styles.profileHeader}>
            {prospect.photoUri ? (
              <Image source={{ uri: prospect.photoUri }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <User size={40} color={colors.accent} />
              </View>
            )}

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{prospect.name}</Text>
              {prospect.nickname && (
                <Text style={styles.profileNickname}>"{prospect.nickname}"</Text>
              )}
              <View style={styles.profileMeta}>
                <View style={[styles.statusBadge, { backgroundColor: `${statusInfo.color}20` }]}>
                  <View style={[styles.statusDot, { backgroundColor: statusInfo.color }]} />
                  <Text style={[styles.statusText, { color: statusInfo.color }]}>
                    {statusInfo.label}
                  </Text>
                </View>
                <Text style={styles.platformText}>{prospect.platform}</Text>
              </View>
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.quickStats}>
            <View style={styles.quickStat}>
              <Heart size={16} color={interestInfo?.color} />
              <Text style={styles.quickStatValue}>{prospect.interestLevel}/5</Text>
              <Text style={styles.quickStatLabel}>Interest</Text>
            </View>
            <View style={styles.quickStat}>
              <Calendar size={16} color={colors.accent} />
              <Text style={styles.quickStatValue}>{prospect.dateCount}</Text>
              <Text style={styles.quickStatLabel}>Dates</Text>
            </View>
            <View style={styles.quickStat}>
              <Clock size={16} color={colors.secondary} />
              <Text style={styles.quickStatValue}>{formatLastContact(prospect.lastContact)}</Text>
              <Text style={styles.quickStatLabel}>Last Contact</Text>
            </View>
          </View>
        </GlassCard>

        {/* Quick Actions */}
        <View style={styles.actionsRow}>
          <Button
            variant="outline"
            size="sm"
            icon={<MessageSquare size={16} color={colors.accent} />}
            onPress={() => setShowLogContactModal(true)}
            style={styles.actionButton}
          >
            Log Contact
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={<Plus size={16} color={colors.accent} />}
            onPress={() => {
              setFlagType('red');
              setShowAddFlagModal(true);
            }}
            style={styles.actionButton}
          >
            Add Flag
          </Button>
        </View>

        {/* Red Flags */}
        <GlassCard variant="medium" style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={18} color="#EF4444" />
            <Text style={styles.sectionTitle}>Red Flags ({prospect.redFlags.length})</Text>
            <Pressable
              onPress={() => {
                setFlagType('red');
                setShowAddFlagModal(true);
              }}
            >
              <Plus size={20} color={colors.accent} />
            </Pressable>
          </View>

          {prospect.redFlags.length === 0 ? (
            <Text style={styles.emptyText}>No red flags noted</Text>
          ) : (
            prospect.redFlags.map((flag) => (
              <View key={flag.id} style={styles.flagItem}>
                <View style={[styles.severityDot, { backgroundColor: getSeverityColor(flag.severity) }]} />
                <Text style={styles.flagText}>{flag.text}</Text>
                <Pressable
                  onPress={() => removeFlag(prospect.id, flag.id, 'red')}
                  hitSlop={8}
                >
                  <X size={16} color={colors.tertiary} />
                </Pressable>
              </View>
            ))
          )}
        </GlassCard>

        {/* Green Flags */}
        <GlassCard variant="medium" style={styles.section}>
          <View style={styles.sectionHeader}>
            <Heart size={18} color="#22C55E" />
            <Text style={styles.sectionTitle}>Green Flags ({prospect.greenFlags.length})</Text>
            <Pressable
              onPress={() => {
                setFlagType('green');
                setShowAddFlagModal(true);
              }}
            >
              <Plus size={20} color={colors.accent} />
            </Pressable>
          </View>

          {prospect.greenFlags.length === 0 ? (
            <Text style={styles.emptyText}>No green flags noted</Text>
          ) : (
            prospect.greenFlags.map((flag) => (
              <View key={flag.id} style={styles.flagItem}>
                <View style={[styles.severityDot, { backgroundColor: '#22C55E' }]} />
                <Text style={styles.flagText}>{flag.text}</Text>
                <Pressable
                  onPress={() => removeFlag(prospect.id, flag.id, 'green')}
                  hitSlop={8}
                >
                  <X size={16} color={colors.tertiary} />
                </Pressable>
              </View>
            ))
          )}
        </GlassCard>

        {/* Topics to Talk About */}
        <GlassCard variant="medium" style={styles.section}>
          <View style={styles.sectionHeader}>
            <Lightbulb size={18} color={colors.accent} />
            <Text style={styles.sectionTitle}>Topics ({prospect.topics.length})</Text>
            <Pressable onPress={() => setShowAddTopicModal(true)}>
              <Plus size={20} color={colors.accent} />
            </Pressable>
          </View>

          {prospect.topics.length === 0 ? (
            <Text style={styles.emptyText}>No topics saved</Text>
          ) : (
            prospect.topics.map((topic) => (
              <View key={topic.id} style={styles.topicItem}>
                <View style={styles.topicContent}>
                  <Text style={styles.topicText}>{topic.topic}</Text>
                  {topic.details && (
                    <Text style={styles.topicDetails}>{topic.details}</Text>
                  )}
                </View>
                <Pressable
                  onPress={() => removeTopic(prospect.id, topic.id)}
                  hitSlop={8}
                >
                  <X size={16} color={colors.tertiary} />
                </Pressable>
              </View>
            ))
          )}
        </GlassCard>

        {/* Contact History */}
        <GlassCard variant="medium" style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={18} color={colors.accent} />
            <Text style={styles.sectionTitle}>Contact History</Text>
          </View>

          {prospect.contactHistory.length === 0 ? (
            <Text style={styles.emptyText}>No contact logged yet</Text>
          ) : (
            prospect.contactHistory.slice(0, 10).map((contact) => (
              <View key={contact.id} style={styles.contactItem}>
                <View style={styles.contactIcon}>
                  {getContactIcon(contact.type)}
                </View>
                <View style={styles.contactContent}>
                  <Text style={styles.contactType}>
                    {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                    {' • '}
                    <Text style={contact.initiatedBy === 'you' ? styles.youInitiated : styles.themInitiated}>
                      {contact.initiatedBy === 'you' ? 'You' : 'Them'}
                    </Text>
                  </Text>
                  <Text style={styles.contactDate}>
                    {new Date(contact.date).toLocaleDateString()}
                  </Text>
                  {contact.notes && (
                    <Text style={styles.contactNotes}>{contact.notes}</Text>
                  )}
                </View>
              </View>
            ))
          )}
        </GlassCard>

        {/* Notes */}
        {prospect.generalNotes && (
          <GlassCard variant="medium" style={styles.section}>
            <View style={styles.sectionHeader}>
              <Edit3 size={18} color={colors.accent} />
              <Text style={styles.sectionTitle}>Notes</Text>
            </View>
            <Text style={styles.notesText}>{prospect.generalNotes}</Text>
          </GlassCard>
        )}
      </ScrollView>

      {/* Add Flag Modal */}
      <Modal
        visible={showAddFlagModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowAddFlagModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Add {flagType === 'red' ? 'Red' : 'Green'} Flag
              </Text>
              <Pressable onPress={() => setShowAddFlagModal(false)}>
                <X size={24} color={colors.primary} />
              </Pressable>
            </View>

            {/* Quick options */}
            <ScrollView style={styles.quickOptions} horizontal showsHorizontalScrollIndicator={false}>
              {(flagType === 'red' ? COMMON_RED_FLAGS : COMMON_GREEN_FLAGS).slice(0, 6).map((flag, i) => (
                <Pressable
                  key={i}
                  style={styles.quickOption}
                  onPress={() => handleAddFlag(flag.text, 'severity' in flag ? (flag as { severity: 1 | 2 | 3 }).severity : undefined)}
                >
                  <Text style={styles.quickOptionText}>{flag.text}</Text>
                </Pressable>
              ))}
            </ScrollView>

            {/* Custom input */}
            <TextInput
              style={styles.modalInput}
              value={customFlagText}
              onChangeText={setCustomFlagText}
              placeholder="Or type your own..."
              placeholderTextColor={colors.tertiary}
            />

            {flagType === 'red' && (
              <View style={styles.severityPicker}>
                <Text style={styles.severityLabel}>Severity:</Text>
                {[1, 2, 3].map((s) => (
                  <Pressable
                    key={s}
                    style={[
                      styles.severityOption,
                      customFlagSeverity === s && {
                        backgroundColor: getSeverityColor(s as 1 | 2 | 3),
                      },
                    ]}
                    onPress={() => setCustomFlagSeverity(s as 1 | 2 | 3)}
                  >
                    <Text style={styles.severityOptionText}>
                      {s === 1 ? 'Low' : s === 2 ? 'Med' : 'High'}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}

            <Button
              variant="primary"
              onPress={() => handleAddFlag(customFlagText, customFlagSeverity)}
              disabled={!customFlagText.trim()}
            >
              Add Flag
            </Button>
          </View>
        </View>
      </Modal>

      {/* Add Topic Modal */}
      <Modal
        visible={showAddTopicModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowAddTopicModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Topic</Text>
              <Pressable onPress={() => setShowAddTopicModal(false)}>
                <X size={24} color={colors.primary} />
              </Pressable>
            </View>

            <TextInput
              style={styles.modalInput}
              value={topicText}
              onChangeText={setTopicText}
              placeholder="Topic to remember..."
              placeholderTextColor={colors.tertiary}
            />

            <TextInput
              style={[styles.modalInput, styles.modalInputMulti]}
              value={topicDetails}
              onChangeText={setTopicDetails}
              placeholder="Details (optional)"
              placeholderTextColor={colors.tertiary}
              multiline
            />

            <Button
              variant="primary"
              onPress={handleAddTopic}
              disabled={!topicText.trim()}
            >
              Save Topic
            </Button>
          </View>
        </View>
      </Modal>

      {/* Log Contact Modal */}
      <Modal
        visible={showLogContactModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowLogContactModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Log Contact</Text>
              <Pressable onPress={() => setShowLogContactModal(false)}>
                <X size={24} color={colors.primary} />
              </Pressable>
            </View>

            <Text style={styles.modalLabel}>Type</Text>
            <View style={styles.contactTypeRow}>
              {CONTACT_TYPES.map((ct) => (
                <Pressable
                  key={ct.id}
                  style={[
                    styles.contactTypeOption,
                    contactType === ct.id && styles.contactTypeActive,
                  ]}
                  onPress={() => setContactType(ct.id as ContactEvent['type'])}
                >
                  <Text style={styles.contactTypeText}>{ct.label}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.modalLabel}>Initiated By</Text>
            <View style={styles.initiatorRow}>
              <Pressable
                style={[
                  styles.initiatorOption,
                  contactInitiator === 'you' && styles.initiatorActive,
                ]}
                onPress={() => setContactInitiator('you')}
              >
                <Text style={styles.initiatorText}>You</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.initiatorOption,
                  contactInitiator === 'them' && styles.initiatorActive,
                ]}
                onPress={() => setContactInitiator('them')}
              >
                <Text style={styles.initiatorText}>Them</Text>
              </Pressable>
            </View>

            <TextInput
              style={[styles.modalInput, styles.modalInputMulti]}
              value={contactNotes}
              onChangeText={setContactNotes}
              placeholder="Notes (optional)"
              placeholderTextColor={colors.tertiary}
              multiline
            />

            <Button variant="primary" onPress={handleLogContact}>
              Log Contact
            </Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function getSeverityColor(severity: 1 | 2 | 3): string {
  return severity === 1 ? '#F59E0B' : severity === 2 ? '#F97316' : '#EF4444';
}

function getContactIcon(type: ContactEvent['type']) {
  switch (type) {
    case 'text':
      return <MessageSquare size={14} color={colors.secondary} />;
    case 'call':
      return <Phone size={14} color={colors.secondary} />;
    case 'date':
      return <Calendar size={14} color={colors.accent} />;
    case 'dm':
      return <Send size={14} color={colors.secondary} />;
    default:
      return <MessageSquare size={14} color={colors.secondary} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.screenPadding,
    paddingVertical: spacing.sm,
  },
  title: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xxl,
  },
  profileCard: {
    marginBottom: spacing.md,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: spacing.md,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accentMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  profileNickname: {
    fontSize: typography.sm,
    color: colors.secondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
  profileMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
  },
  platformText: {
    fontSize: typography.xs,
    color: colors.secondary,
    textTransform: 'capitalize',
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  quickStat: {
    alignItems: 'center',
    gap: 4,
  },
  quickStatValue: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  quickStatLabel: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    flex: 1,
  },
  emptyText: {
    fontSize: typography.sm,
    color: colors.tertiary,
    fontStyle: 'italic',
  },
  flagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  severityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  flagText: {
    flex: 1,
    fontSize: typography.sm,
    color: colors.primary,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  topicContent: {
    flex: 1,
  },
  topicText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  topicDetails: {
    fontSize: typography.xs,
    color: colors.secondary,
    marginTop: 2,
  },
  contactItem: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactIcon: {
    width: 24,
    alignItems: 'center',
    paddingTop: 2,
  },
  contactContent: {
    flex: 1,
  },
  contactType: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  youInitiated: {
    color: colors.accent,
  },
  themInitiated: {
    color: colors.secondary,
  },
  contactDate: {
    fontSize: typography.xs,
    color: colors.tertiary,
    marginTop: 2,
  },
  contactNotes: {
    fontSize: typography.xs,
    color: colors.secondary,
    marginTop: 4,
    fontStyle: 'italic',
  },
  notesText: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  modalLabel: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.secondary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  modalInput: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.md,
    color: colors.primary,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  modalInputMulti: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  quickOptions: {
    maxHeight: 40,
    marginBottom: spacing.md,
  },
  quickOption: {
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickOptionText: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
  severityPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  severityLabel: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  severityOption: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  severityOptionText: {
    fontSize: typography.sm,
    color: colors.primary,
  },
  contactTypeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  contactTypeOption: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactTypeActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentMuted,
  },
  contactTypeText: {
    fontSize: typography.sm,
    color: colors.primary,
  },
  initiatorRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  initiatorOption: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  initiatorActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentMuted,
  },
  initiatorText: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.primary,
  },
});
